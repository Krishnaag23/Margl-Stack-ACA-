package handler

import (
	"encoding/json"
	"net/http"
)

func CreateProject(w http.ResponseWriter, r *http.Request) {
	var requestProject struct {
		Name        string   `json:"name"`
		Description string   `json:"description"`
		Roles       []string `json:"roles"`
		Tags        []string `json:"tags"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestProject); err != nil {
		writeJSONResponse(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	var project Project
	project.Name = requestProject.Name
	project.Description = requestProject.Description

	if err := project.MarshalRoles(requestProject.Roles); err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to process roles")
		return
	}

	if err := project.MarshalTags(requestProject.Tags); err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to process tags")
		return
	}

	claims, ok := r.Context().Value("claims").(*Claims)
	if !ok {
		writeJSONResponse(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	var user User
	if err := DB.Where("username = ?", claims.Username).First(&user).Error; err != nil {
		writeJSONResponse(w, http.StatusUnauthorized, "User not found")
		return
	}

	project.UserID = user.ID
	if err := DB.Create(&project).Error; err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to create project")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(project)
}

func GetProjects(w http.ResponseWriter, r *http.Request) {
	var projects []Project
	if err := DB.Find(&projects).Error; err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to fetch projects")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}
