package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	InitDatabase()

	r := mux.NewRouter()

	// Public routes
	r.HandleFunc("/signup", SignUp).Methods("POST")
	r.HandleFunc("/signin", SignIn).Methods("POST")

	// Protected routes
	api := r.PathPrefix("/auth").Subrouter()
	api.Use(AuthMiddleware)
	api.HandleFunc("/projects", CreateProject).Methods("POST")
	api.HandleFunc("/projects", GetProjects).Methods("GET")
	api.HandleFunc("/hackathons", CreateHackathon).Methods("POST")
	api.HandleFunc("/hackathons", GetHackathons).Methods("GET")

	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowedHeaders:   []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	handler := corsOptions.Handler(r)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
