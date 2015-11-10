package routers

import (
	"martiniDemo/app"
	"martiniDemo/controllers"
)

func init() {
	ctrl := controllers.ArticleController{}

	app.Instance.Get("/article/:id", ctrl.Bar)
}
