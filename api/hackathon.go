package main

import (
	"bytes"
	"encoding/json"
	"io"

	"log"
	"net/http"
)

func CreateHackathon(w http.ResponseWriter, r *http.Request) {
	var requestHackathon struct {
		ImageUrl         string   `json:"image_url"`
		Title            string   `json:"title"`
		DaysLeft         string   `json:"days_left"`
		Online           bool     `json:"online"`
		PrizeAmount      string   `json:"prize_amount"`
		Participants     string   `json:"participants"`
		HostName         string   `json:"host_name"`
		HostLogoUrl      string   `json:"host_logo_url"`
		SubmissionPeriod string   `json:"submission_period"`
		ManagedBy        string   `json:"managed_by"`
		ManagedByLogoUrl string   `json:"managed_by_logo_url"`
		Themes           []string `json:"themes"`
	}

	// Log the request body for debugging
	body, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSONResponseHackathon(w, http.StatusBadRequest, "Failed to read request body")
		return
	}
	log.Printf("Request Body: %s", body)

	// Decode the JSON payload from the saved body
	if err := json.Unmarshal(body, &requestHackathon); err != nil {
		writeJSONResponseHackathon(w, http.StatusBadRequest, "Invalid request payload")
		log.Printf("Invalid request payload: %v", err)
		return
	}
    
	// Reassign the request body so it can be used in the next decoding step
	r.Body = io.NopCloser(bytes.NewBuffer(body))

	// Populate the hackathon struct
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
		writeJSONResponseHackathon(w, http.StatusInternalServerError, "Failed to process themes")
		return
	}

	if err := DB.Create(&hackathon).Error; err != nil {
		writeJSONResponseHackathon(w, http.StatusInternalServerError, "Failed to create hackathon")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(hackathon)
}




func GetHackathons(w http.ResponseWriter, r *http.Request) {
	var hackathons []Hackathon
	if err := DB.Find(&hackathons).Error; err != nil {
		writeJSONResponseHackathon(w, http.StatusInternalServerError, "Failed to fetch hackathons")
		return
	}

	var responseHackathons []struct {
		ImageUrl         string   `json:"image_url"`
		Title            string   `json:"title"`
		DaysLeft         string   `json:"days_left"`
		Online           bool     `json:"online"`
		PrizeAmount      string   `json:"prize_amount"`
		Participants     string   `json:"participants"`
		HostName         string   `json:"host_name"`
		HostLogoUrl      string   `json:"host_logo_url"`
		SubmissionPeriod string   `json:"submission_period"`
		ManagedBy        string   `json:"managed_by"`
		ManagedByLogoUrl string   `json:"managed_by_logo_url"`
		Themes           []string `json:"themes"`
	}

	for _, hackathon := range hackathons {
		themes, err := hackathon.UnmarshalThemes()
		if err != nil {
			writeJSONResponseHackathon(w, http.StatusInternalServerError, "Failed to parse themes")
			return
		}

		responseHackathons = append(responseHackathons, struct {
			ImageUrl         string   `json:"image_url"`
			Title            string   `json:"title"`
			DaysLeft         string   `json:"days_left"`
			Online           bool     `json:"online"`
			PrizeAmount      string   `json:"prize_amount"`
			Participants     string   `json:"participants"`
			HostName         string   `json:"host_name"`
			HostLogoUrl      string   `json:"host_logo_url"`
			SubmissionPeriod string   `json:"submission_period"`
			ManagedBy        string   `json:"managed_by"`
			ManagedByLogoUrl string   `json:"managed_by_logo_url"`
			Themes           []string `json:"themes"`
		}{
			ImageUrl:         hackathon.ImageUrl,
			Title:            hackathon.Title,
			DaysLeft:         hackathon.DaysLeft,
			Online:           hackathon.Online,
			PrizeAmount:      hackathon.PrizeAmount,
			Participants:     hackathon.Participants,
			HostName:         hackathon.HostName,
			HostLogoUrl:      hackathon.HostLogoUrl,
			SubmissionPeriod: hackathon.SubmissionPeriod,
			ManagedBy:        hackathon.ManagedBy,
			ManagedByLogoUrl: hackathon.ManagedByLogoUrl,
			Themes:           themes,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responseHackathons)
}

func writeJSONResponseHackathon(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"message": message})
}
