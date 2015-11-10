package main

import (
	"martiniDemo/app"
	_ "martiniDemo/routers"
	"net/http"
	_ "net/http/pprof"
)

const (
	Dev  string = "development"
	Prod string = "production"
	Test string = "test"
)

type UserInfo struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {

	app.Instance.NotFound(func() string {
		return "NotFound"
	})

	http.ListenAndServe(":3003", app.Instance)

	app.Instance.Run()
}
