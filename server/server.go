package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/mrtzee/react-go/config"
	"github.com/mrtzee/react-go/router"
)

func init() {
	config.LoadConfig()
	config.ConnectDB()
}

func main() {
	sqlDB, err := config.DB.DB()
	if err != nil {
		panic(err)
	}
	defer sqlDB.Close()

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Use(logger.New())
	router.SetupRoutes(app)
	app.Listen(fmt.Sprintf(":%v", config.ENV.PORT))
}
