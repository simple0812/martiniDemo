package routers

import (
	"martiniDemo/app"
	"martiniDemo/controllers"
)

func init() {
	ctrl := controllers.CommentController{}

	app.Instance.Get("/comment", ctrl.GetList)
	app.Instance.Put("/comment", ctrl.Update)
	app.Instance.Post("/comment", ctrl.Create)
	app.Instance.Delete("/comment", ctrl.Remove)
}
