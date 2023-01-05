const db = require("../models")
const fs = require("fs")
const { Op } = require("sequelize")

const Review = db.Review
const User = db.User

const reviewController = {
  createReview: async (req, res) => {
    try {
      const createUserReview = Review.create({
        review: req.body.review,
        UserId: req.body.UserId,
        PropertyId: req.body.PropertyId,
        TransactionId: req.body.TransactionId,
        // UserId: "20",
        // PropertyId: "5",
      })
      return res.status(201).json({
        message: "Review created",
        data: createUserReview,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = reviewController
