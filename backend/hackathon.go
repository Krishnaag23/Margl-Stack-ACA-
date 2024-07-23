package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func CreateHackathon(w http.ResponseWriter, r *http.Request) {
	var requestHackathon struct {
		ImageUrl         string   `json:"image_url"`
		Title            string   `json:"title"`
		DaysLeft         int      `json:"days_left"`
		Online           bool     `json:"online"`
		PrizeAmount      string   `json:"prize_amount"`
		Participants     int      `json:"participants"`
		HostName         string   `json:"host_name"`
		HostLogoUrl      string   `json:"host_logo_url"`
		SubmissionPeriod string   `json:"submission_period"`
		ManagedBy        string   `json:"managed_by"`
		ManagedByLogoUrl string   `json:"managed_by_logo_url"`
		Themes           []string `json:"themes"`
	}
	

	if err := json.NewDecoder(r.Body).Decode(&requestHackathon); err != nil {
		log.Printf("this is the invalid request error: %v", err)
		writeJSONResponse(w, http.StatusBadRequest, "Invalid request payload")

		return
	}

	var hackathon Hackathon
	hackathon.ImageUrl = requestHackathon.ImageUrl
	hackathon.Title = requestHackathon.Title
	hackathon.DaysLeft = requestHackathon.DaysLeft
	hackathon.Online = requestHackathon.Online
	hackathon.PrizeAmount = requestHackathon.PrizeAmount
	hackathon.Participants = requestHackathon.Participants
	hackathon.HostName = requestHackathon.HostName
	hackathon.HostLogoUrl = requestHackathon.HostLogoUrl
	hackathon.SubmissionPeriod = requestHackathon.SubmissionPeriod
	hackathon.ManagedBy = requestHackathon.ManagedBy
	hackathon.ManagedByLogoUrl = requestHackathon.ManagedByLogoUrl

	if err := hackathon.MarshalThemes(requestHackathon.Themes); err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to process themes")
		return
	}

	if err := DB.Create(&hackathon).Error; err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to create hackathon")
		return
	}

	writeJSONResponse(w, http.StatusCreated, "Hackathon created successfully")
}

func GetHackathons(w http.ResponseWriter, r *http.Request) {
	var hackathons []Hackathon
	if err := DB.Find(&hackathons).Error; err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, "Failed to fetch hackathons")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(hackathons)
}
