// const nodemailer = require("nodemailer")

// const emailer = async ({ to, subject, text, html }) => {
//   if (!to)
//     throw new Error("Emailer need recipient email. `to` parameter is missing")

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAILER_EMAIL,
//       pass: process.env.EMAILER_PASSWORD,
//     },
//   })
//   await transporter.sendMail({
//     to,
//     subject,
//     html,
//   })
// }

// module.exports = emailer

const nodemailer = require("nodemailer")

const emailer = async ({
  to,
  subject,
  text,
  html,
  attachments,
  filename,
  path,
  cid,
}) => {
  if (!to)
    throw new Error("Emailer need recipient email. `to` parameter is missing")

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL || "nginepin9433@gmail.com",
      pass: process.env.NODEMAILER_PASS || "nnhxgbehhcijebch",
    },
    // secure: false,
    // port: 587,
  })
  await transporter.sendMail({
    to, //Email penerima
    subject, //Subject email
    text, //Body email dalam bentuk text
    html, //Body email dalam bentuk HTML
    attachments,
    filename,
    path,
    cid,
  })
}

module.exports = emailer
