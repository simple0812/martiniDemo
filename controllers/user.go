package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"martiniDemo/models"
	"martiniDemo/utils"
	"net/http"
)

type UserController struct {
}

func (UserController) Create(req *http.Request, res http.ResponseWriter) string {
	result, _ := ioutil.ReadAll(req.Body)
	defer req.Body.Close()

	var user models.User
	json.Unmarshal(result, &user)

	if user.Name == "" || user.Nick == "" {
		return utils.GetFailResult("name or nick is empty")
	}

	user.ID = 0
	models.DB.Create(&user)

	r, _ := utils.GetSucessResult(user)

	return r
}

func (UserController) Update(req *http.Request, res http.ResponseWriter) string {
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{"val", 18})

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
