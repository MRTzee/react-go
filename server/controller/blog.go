package controller

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/mrtzee/react-go/config"
	"github.com/mrtzee/react-go/model"
)

func BlogList(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "Ok",
		"message":    "Blog List",
	}
	time.Sleep(time.Millisecond * 1500)
	var records []model.Blog
	config.DB.Find(&records)
	context["blog_records"] = records
	c.Status(200)
	return c.JSON(context)
}

func BlogDetail(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "Ok",
		"message":    "Blog Detail",
	}
	id := c.Params("id")
	var record model.Blog
	config.DB.First(&record, id)
	if record.ID == 0 {
		context["statusText"] = ""
		context["message"] = "Record not found"
		log.Println("Record not found")
		c.Status(404)
		return c.JSON(context)
	}

	context["record"] = record
	c.Status(200)
	return c.JSON(context)
}

func BlogCreate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "Ok",
		"message":    "Add a Blog",
	}
	record := new(model.Blog)
	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request")
		context["statusText"] = ""
	}

	result := config.DB.Create(&record)
	if result.Error != nil {
		log.Println("Error in savind data")
		context["statusText"] = ""
	}

	context["message"] = "Record is save succesfully"
	context["data"] = record

	c.Status(201)
	return c.JSON(context)
}

func BlogUpdate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "Ok",
		"message":    "Update Blog",
	}
	id := c.Params("id")
	var record model.Blog
	config.DB.First(&record, id)

	if record.ID == 0 {
		context["statusText"] = ""
		context["message"] = "Record not found"
		log.Println("Record not found")
		c.Status(404)
		return c.JSON(context)
	}

	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request")
	}

	result := config.DB.Save(&record)
	if result.Error != nil {
		log.Println("Error in saving data")
	}

	context["data"] = record
	context["message"] = "Record updated succesfully"

	c.Status(200)
	return c.JSON(context)
}

func BlogDelete(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "Ok",
		"message":    "Delete blog",
	}

	id := c.Params("id")
	var record model.Blog
	config.DB.First(&record, id)
	if record.ID == 0 {
		context["statusText"] = ""
		context["message"] = "Record not found"
		log.Println("Record not found")
		c.Status(404)
		return c.JSON(context)
	}

	result := config.DB.Delete(&record)
	if result.Error != nil {
		context["message"] = "Something went wrong"
		c.Status(404)
	}

	context["message"] = "Blog deleted succesfully"
	c.Status(200)
	return c.JSON(context)
}
