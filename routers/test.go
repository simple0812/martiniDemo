package routers

import (
	_ "fmt"
	"martiniDemo/app"
	"martiniDemo/controllers"
)

func init() {
	ctrl := controllers.TestController{}

	app.Instance.Get("/baz/:id", ctrl.Bar)
	app.Instance.Get("/foo/:id", ctrl.Foo)
}
