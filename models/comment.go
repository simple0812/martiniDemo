package models

type Comment struct {
	ID        int `json:"id"`
	UserId    int `json:"userId" sql:"index"`
	ArticleId int `json:"atricleId" sql:"index"`
	Content   int `json:"content"`
	Status    int `json:"status"`
	CreatedAt int `json:"createdAt"`
}
