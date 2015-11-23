package models

type User struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Nick      string `json:"nick"`
	Age       int    `json:"age"`
	CreatedAt int    `json:"createdAt"`

	Articles []Article
	Comments []Comment
}
