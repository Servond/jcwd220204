const schedule = require("node-schedule")
const db = require("../models")

const paymentCheck = (objectTransaction) => {
  schedule.scheduleJob(objectTransaction.exp_date, async () => {
    const getTransaction = await db.Transaction.findByPk(objectTransaction.id)

    if (objectTransaction.status === "waiting for payment") {
      await db.Transaction.update(
        {
          status: "payment expired",
        },
        {
          where: {
            id: getTransaction.id,
          },
        }
      )
    }
  })
}

module.exports = paymentCheck
