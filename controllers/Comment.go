package controllers

import (
	"fmt"
	"martiniDemo/models"
	"martiniDemo/utils"
	"net/http"
	"time"

	"github.com/martini-contrib/render"
)

type CommentController struct {
}


func (CommentController) Create(req *http.Request, res http.ResponseWriter) string {
	fmt.Println("create")
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	user := models.User{
		Name:      "zhanglei",
		Nick:      val,
		Age:       1,
		CreatedAt: int(time.Now().Unix()),
	}

	models.DB.Create(&user)

	return p
}

func (CommentController) Update(req *http.Request, res http.ResponseWriter) string {
	fmt.Println("Update")
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	return p
}

func (CommentController) Remove(req *http.Request, res http.ResponseWriter) string {
	fmt.Println("Remove")
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	return p
}

func (CommentController) GetList(req *http.Request, res http.ResponseWriter) string {
	fmt.Println("GetList")
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	return p
}
