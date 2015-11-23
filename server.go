package main

import (
	"martiniDemo/app"
	_ "martiniDemo/models"
	_ "martiniDemo/routers"
	"net/http"
	_ "net/http/pprof"
)

const (
	Dev  string = "development"
	Prod string = "production"
	Test string = "test"
)

func main() {

	app.Instance.NotFound(func() string {
		return "NotFound"
	})

	http.ListenAndServe(":3003", app.Instance)

	go app.Instance.Run()
}
