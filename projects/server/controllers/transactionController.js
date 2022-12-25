const moment = require("moment")
const db = require("../models")
const automaticPaymentCheck = require("../schedule/paymentCheck")

const transactionController = {
  paymentProof: async (req, res) => {
    try {
      const expDate = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["exp_date"],
      })
      const getExpDate = Object.values(expDate.dataValues)
      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss")
      const expiredDate = moment(getExpDate[0]).format("YYYY-MM-DD HH:mm:ss")

      if (currentDate > expiredDate) {
        return res.status(400).json({
          message: "your invoice is expired",
        })
      }

      const postImg = await db.Transaction.update(
        {
          payment_proof: req.file.filename,
          status: "waiting for tenant confirmation",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )

      return res.status(200).json({
        message: "Payment successful",
        data: postImg,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
      })
    }
  },
  getDataTransaction: async (req, res) => {
    try {
      const get = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["exp_date", "price", "status"],
      })

      const date = Object.values(get.dataValues)
      const getPrice = Object.values(get.dataValues)

      const price = getPrice[1]
      const dateNow = moment(date[0]).add(-7, "hours").format("LLL")

      return res.status(200).json({
        message: "Get countdown",
        get,
        dateNow,
        price,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  createTransactionDummy: async (req, res) => {
    try {
      const expired_date = moment()
        .add(2, "hours")
        .format("YYYY-MM-DD HH:mm:ss")
      const start = moment().add(3, "days").format("YYYY-MM-DD HH:mm:ss")
      const end = moment().add(5, "days").format("YYYY-MM-DD HH:mm:ss")

      const dummyTransaction = await db.Transaction.create({
        start_date: start,
        end_date: end,
        price: 1000,
        PropertyItemId: 1,
        PropertyId: 384,
        UserId: 60,
        exp_date: expired_date,
        status: "waiting for payment",
      })

      automaticPaymentCheck(dummyTransaction)

      return res.status(200).json({
        message: "create transaction",
        data: dummyTransaction,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = transactionController
