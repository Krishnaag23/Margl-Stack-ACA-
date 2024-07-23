package main

import (
	"encoding/json"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	Email    string
}

type Project struct {
	gorm.Model
	Name        string
	Description string
	Roles       string `gorm:"type:text"` // Store as JSON string
	Tags        string `gorm:"type:text"` // Store as JSON string
	UserID      uint
}

// UnmarshalRoles parses the Roles JSON string into a slice of strings
func (p *Project) UnmarshalRoles() ([]string, error) {
	var roles []string
	if err := json.Unmarshal([]byte(p.Roles), &roles); err != nil {
		return nil, err
	}
	return roles, nil
}

// MarshalRoles converts a slice of strings into a JSON string for storage
func (p *Project) MarshalRoles(roles []string) error {
	data, err := json.Marshal(roles)
	if err != nil {
		return err
	}
	p.Roles = string(data)
	return nil
}

// UnmarshalTags parses the Tags JSON string into a slice of strings
func (p *Project) UnmarshalTags() ([]string, error) {
	var tags []string
	if err := json.Unmarshal([]byte(p.Tags), &tags); err != nil {
		return nil, err
	}
	return tags, nil
}

// MarshalTags converts a slice of strings into a JSON string for storage
func (p *Project) MarshalTags(tags []string) error {
	data, err := json.Marshal(tags)
	if err != nil {
		return err
	}
	p.Tags = string(data)
	return nil
}

type Hackathon struct {
	gorm.Model
	ImageUrl         string
	Title            string
	DaysLeft         int
	Online           bool
	PrizeAmount      string
	Participants     int
	HostName         string
	HostLogoUrl      string
	SubmissionPeriod string
	ManagedBy        string
	ManagedByLogoUrl string
	Themes           string `gorm:"type:text"` // Store JSON as string
}

func (h *Hackathon) UnmarshalThemes() ([]string, error) {
	var themes []string
	err := json.Unmarshal([]byte(h.Themes), &themes)
	if err != nil {
		return nil, err
	}
	return themes, nil
}

func (h *Hackathon) MarshalThemes(themes []string) error {
	data, err := json.Marshal(themes)
	if err != nil {
		return err
	}
	h.Themes = string(data)
	return nil
}
