package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mrtzee/react-go/controller"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", controller.BlogList)
	app.Post("/", controller.BlogCreate)
	app.Put("/:id", controller.BlogUpdate)
	app.Delete("/:id", controller.BlogDelete)
}
