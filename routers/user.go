package routers

import (
	"martiniDemo/app"
	"martiniDemo/controllers"
)

func init() {
	ctrl := controllers.UserController{}

	app.Instance.Get("/user/:id", ctrl.GetList)
	app.Instance.Get("/users", ctrl.GetList)
	app.Instance.Put("/user", ctrl.Update)
	app.Instance.Post("/user", ctrl.Create)
	app.Instance.Delete("/user", ctrl.Remove)
}
