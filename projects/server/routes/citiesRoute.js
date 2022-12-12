const express = require("express")
const citiesController = require("../controllers/cities.Controller")

const router = express.Router()

router.get("/", citiesController.getCityOfProperty)

module.exports = router
