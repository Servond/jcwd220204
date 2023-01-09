const express = require("express")
const reviewController = require("../controllers/reviewController")
const router = express.Router()

router.post("/addreview", reviewController.createReview)
router.get("/:id", reviewController.findReviewById)

module.exports = router
