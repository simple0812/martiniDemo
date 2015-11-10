package models

type Article struct {
	Name      string `json:"name"`
	Nick      string `json:"nick"`
	Age       int    `json:"age"`
	CreatedAt string `json:"created_at"`
}
