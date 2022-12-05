const nodemailer = require("nodemailer")

const emailer = async ({ to, subject, text, html }) => {
  if (!to)
    throw new Error("Emailer need recipient email. `to` parameter is missing")

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILER_EMAIL,
      pass: process.env.EMAILER_PASSWORD,
    },
  })
  await transporter.sendMail({
    to,
    subject,
    html,
  })
}

module.exports = emailer
