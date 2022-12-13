const express = require("express")
const citiesController = require("../controllers/citiesController")

const router = express.Router()

router.get("/", citiesController.getCityOfProperty)
router.get("/all", citiesController.getAllCities)

module.exports = router
