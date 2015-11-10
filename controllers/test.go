package controllers

import (
	"beegoDemo/utils"
	"net/http"

	"github.com/martini-contrib/render"
)

type TestController struct {
}

func (TestController) Foo(req *http.Request, res http.ResponseWriter) string {
	val := req.FormValue("key")
	res.Header().Set("Content-Type", "application/json")
	p, _ := utils.GetSucessResult(struct {
		Name string
		Age  int
	}{val, 18})

	return p
}

func (TestController) Bar(req *http.Request, res http.ResponseWriter, r render.Render) {
	var values map[string]string = map[string]string{"key": "xxxx"}
	r.HTML(200, "test", values)
}
