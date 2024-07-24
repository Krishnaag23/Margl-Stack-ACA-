package handler

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("my_secret_key")

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		writeJSONResponse(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	var existingUser User
	if err := DB.Where("email = ?", creds.Email).First(&existingUser).Error; err == nil {
		writeJSONResponse(w, http.StatusConflict, "User already exists")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	user := User{Username: creds.Username, Password: string(hashedPassword), Email: creds.Email}
	if err := DB.Create(&user).Error; err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to create user")
		return
	}

	writeJSONResponse(w, http.StatusCreated, "Signup successful")
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		writeJSONResponse(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	var user User
	if err := DB.Where("email = ?", creds.Email).First(&user).Error; err != nil {
		writeJSONResponse(w, http.StatusUnauthorized, "Invalid username or password")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		writeJSONResponse(w, http.StatusUnauthorized, "Invalid username or password")
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	response := map[string]string{
		"message": "Signin successful",
		"token":   tokenString,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenStr := r.Header.Get("Authorization")
		if tokenStr == "" {
			writeJSONResponse(w, http.StatusUnauthorized, "Unauthorized")
			return
		}

		claims := &Claims{}
		tkn, err := jwt.ParseWithClaims(strings.TrimPrefix(tokenStr, "Bearer "), claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !tkn.Valid {
			log.Printf("This is the error: %v, This is the tkn validation status: %v", err, tkn.Valid)
			writeJSONResponse(w, http.StatusUnauthorized, "Unauthorized")
			return
		}

		ctx := context.WithValue(r.Context(), "claims", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func writeJSONResponse(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	if message != "" {
		json.NewEncoder(w).Encode(Response{Message: message})
	} else {
		json.NewEncoder(w).Encode(Response{})
	}
}

type Response struct {
	Message string `json:"message,omitempty"`
}
