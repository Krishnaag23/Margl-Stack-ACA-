// api/main.go
package main

import (
	"log"
	"net/http"

	"api/handler"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Init is the exported function that Vercel will call to start the server
func Handler() {
	handler.InitDatabase()

	r := mux.NewRouter()

	// Public routes
	r.HandleFunc("/signup", handler.SignUp).Methods("POST")
	r.HandleFunc("/signin", handler.SignIn).Methods("POST")

	// Protected routes
	api := r.PathPrefix("/auth").Subrouter()
	api.Use(handler.AuthMiddleware)
	api.HandleFunc("/projects", handler.CreateProject).Methods("POST")
	api.HandleFunc("/projects", handler.GetProjects).Methods("GET")
	api.HandleFunc("/hackathons", handler.CreateHackathon).Methods("POST")
	api.HandleFunc("/hackathons", handler.GetHackathons).Methods("GET")

	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowedHeaders:   []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	handler := corsOptions.Handler(r)

	log.Fatal(http.ListenAndServe(":8000", handler))
}

// main is the entry point for local testing
func main() {
	Handler()
}
