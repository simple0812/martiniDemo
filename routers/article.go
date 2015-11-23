package routers

import (
	"martiniDemo/app"
	"martiniDemo/controllers"
)

func init() {
	ctrl := controllers.ArticleController{}

	app.Instance.Get("/article", ctrl.GetList)
	app.Instance.Put("/article", ctrl.Update)
	app.Instance.Post("/article", ctrl.Create)
	app.Instance.Delete("/article", ctrl.Remove)
}
