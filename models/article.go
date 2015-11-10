package models

type Article struct {
	Title     string `json:"title"`
	Content   string `json:"content"`
	Status    int    `json:"status"`
	CreatedAt string `json:"created_at"`
}
