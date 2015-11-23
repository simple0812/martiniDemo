package routers

import (
	"martiniDemo/app"
	"martiniDemo/controllers"
)

func init() {
	ctrl := controllers.UserController{}

	app.Instance.Get("/user", ctrl.GetList)
	app.Instance.Put("/user", ctrl.Update)
	app.Instance.Post("/user", ctrl.Create)
	app.Instance.Delete("/user", ctrl.Remove)
}
