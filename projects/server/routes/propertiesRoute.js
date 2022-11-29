const express = require('express')
const propertiesController = require('../controllers/propertiesController')

const router = express.Router()

router.get("/", propertiesController.getAllProperties)
router.get("/:id", propertiesController.getPropertyById)
router.get("/room/:id", propertiesController.getRoomById)

module.exports = router