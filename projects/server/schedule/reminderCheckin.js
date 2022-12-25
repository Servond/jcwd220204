const schedule = require("node-schedule")
const db = require("../models")
const moment = require("moment")
const { Op } = require("sequelize")
const fs = require("fs")
const emailer = require("../lib/emailer")
const handlebars = require("handlebars")
// findID yg baru di buat, lihat status ketika udh confirm dan status isChecked false
// send email dan blm pernah di kirim email

const dummy = {
  id: 19,
}

const sendAutoEmail = async (objectTransaction) => {
  const getStartDate = objectTransaction.start_date
  // const reminder = moment(getStartDate).subtract(1, "days")
  const reminder = moment().add(20, "seconds")
  schedule.scheduleJob(new Date(reminder), async () => {
    try {
      const transactionData = await db.Transaction.findByPk(
        objectTransaction.id,
        {
          include: [
            { model: db.User, attributes: ["email"] },
            { model: db.Property, attributes: ["name"] },
          ],
        }
      )

      const getUserEmail = transactionData.User.email
      const checkIn = moment(transactionData.start_date).format("DD-mm-YYYY")
      const propName = transactionData.Property.name

      if (
        transactionData.status === "in progress" &&
        !transactionData.is_checked
      ) {
        const rawHtml = fs.readFileSync(
          "templates/checkinReminder.html",
          "utf-8"
        )
        const compiledHTML = handlebars.compile(rawHtml)
        const htmlresult = compiledHTML({
          checkIn,
          propName,
        })
        await emailer({
          to: getUserEmail,
          html: htmlresult,
          subect: "Your Booking Detail",
          text: "Hallo",
        })
      }

      await db.Transaction.update(
        {
          is_checked: 1,
        },
        {
          where: {
            id: transactionData.id,
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
  })
}

// sendAutoEmail(dummy)
module.exports = sendAutoEmail
