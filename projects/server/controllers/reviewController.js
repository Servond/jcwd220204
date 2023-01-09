const db = require("../models")
const fs = require("fs")
const { Op } = require("sequelize")

const Review = db.Review
const User = db.User

const reviewController = {
  createReview: async (req, res) => {
    try {
      // const transaction = await db.Transaction.findOne({
      //   where: { ReviewId: req.body.review },
      // })
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
        data: transaction,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  findReviewById: async (req, res) => {
    try {
      const review = await db.Transaction.findByPk(req.params.id, {
        include: {
          model: Review,
        },
      })
      console.log(review)

      res.status(200).json({
        message: "Find review By Id",
        data: review,
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
