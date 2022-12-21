const express = require("express")
const calendarController = require("../controllers/calendarController")

const router = express.Router()

router.get("/:id", calendarController.getAvailCalendar)

module.exports = router
