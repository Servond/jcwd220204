const express = require("express")
const reviewController = require("../controllers/reviewController")
const router = express.Router()

router.post("/addreview", reviewController.createReview)

module.exports = router
