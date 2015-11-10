package routers

import (
	"martiniDemo/app"
	"martiniDemo/controllers"
)

func init() {
	ctrl := controllers.UserController{}

	app.Instance.Get("/user/:id", ctrl.Bar)
}
