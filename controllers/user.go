package controllers

import (
	"fmt"
	"martiniDemo/models"
	"martiniDemo/utils"
	"net/http"
	"time"
)

type UserController struct {
}

func (UserController) Create(req *http.Request, res http.ResponseWriter) string {
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

func (UserController) Update(req *http.Request, res http.ResponseWriter) string {
	fmt.Println("Update")
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	return p
}

func (UserController) Remove(req *http.Request, res http.ResponseWriter) string {
	fmt.Println("Remove")
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	return p
}

func (UserController) GetList(req *http.Request, res http.ResponseWriter) string {
	fmt.Println("GetList")
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	return p
}
