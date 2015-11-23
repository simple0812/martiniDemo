package controllers

import (
	"martiniDemo/models"
	"martiniDemo/utils"
	"net/http"
	"time"

	"github.com/martini-contrib/render"
)

type TestController struct {
}

func (TestController) Foo(req *http.Request, res http.ResponseWriter) string {
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")

	user := models.User{
		Name:      "zhanglei",
		Nick:      val,
		Age:       1,
		CreatedAt: int(time.Now().Unix()),
	}

	models.DB.Create(&user)

	p, _ := utils.GetSucessResult(user)

	return p
}

func (TestController) Bar(req *http.Request, res http.ResponseWriter, r render.Render) {
	var values map[string]string = map[string]string{"key": "xxxx"}
	r.HTML(200, "test", values)
}
