const { Op } = require("sequelize")
const db = require("../models")
const User = db.User
const bcrypt = require("bcrypt")
const { signToken, validateToken } = require("../lib/jwt")
const { verifyGoogleToken } = require("../lib/firebase")
const fs = require("fs")
const handleBars = require("handlebars")
const emailer = require("../lib/emailer")
const {
  validateVerificationToken,
  createVerificationToken,
} = require("../lib/verification")

const { useToast } = require("@chakra-ui/react")

const authController = {
  registerUser: async (req, res) => {
    try {
      const { email, username, phone_number, role, loginWith } = req.body

      const findUserByEmail = await User.findOne({
        where: { email },
      })

      if (findUserByEmail) {
        return res.status(400).json({
          message: "Another account is using the same email",
        })
      }

      const newUser = await User.create({
        email,
        username,
        phone_number,
        role,
        loginWith,
      })

      const verificationToken = createVerificationToken({
        id: newUser.id,
      })

      const verificationLink = `http://localhost:8204/auth/verification?verification_token=${verificationToken}`
      //Sending email
      const rawHTML = fs.readFileSync("templates/register_user.html", "utf-8")
      const compiledHTML = handleBars.compile(rawHTML)
      const htmlResult = compiledHTML({
        username,
        verificationLink,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Verify your account",
        text: "Please verify your account",
      })

      return res.status(200).json({
        message: "User registered",
        data: newUser,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  registerTenant: async (req, res) => {
    try {
      const { email, username, phone_number, role, loginWith } = req.body

      if (req.file) {
        req.body.ktp = req.file.filename
      }

      const findUserByEmail = await User.findOne({
        where: { email },
      })

      if (findUserByEmail) {
        return res.status(400).json({
          message: "Another account is using the same email",
        })
      }

      const newUser = await User.create({
        email,
        username,
        phone_number,
        role,
        ktp: req.body.ktp,
        loginWith,
      })
      const verificationToken = createVerificationToken({
        id: newUser.id,
      })

      const verificationLink = `http://localhost:8204/auth/verification?verification_token=${verificationToken}`
      //Sending email
      const rawHTML = fs.readFileSync("templates/register_user.html", "utf-8")
      const compiledHTML = handleBars.compile(rawHTML)
      const htmlResult = compiledHTML({
        username,
        verificationLink,
      })
      await emailer({
        to: email,
        html: htmlResult,
        subject: "Verify your account",
        text: "Please verify your account",
      })

      return res.status(200).json({
        message: "User registered",
        data: newUser,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  refreshToken: async (req, res) => {
    try {
      const findUserById = await User.findByPk(req.user.id)

      const renewedToken = signToken({
        id: req.user.id,
      })

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  loginUser: async (req, res) => {
    try {
      const { googleToken } = req.body

      const { email } = await verifyGoogleToken(googleToken)
      // console.log(googleToken)
      const [user] = await User.findOrCreate({
        where: { email },
        defaults: {
          is_verified: true,
          loginWith: "google",
        },
      })

      if (user.role !== "user") {
        throw new Error("user not found")
      }

      const token = signToken({
        id: user.id,
      })

      return res.status(201).json({
        message: "User logged in",
        data: user,
        token,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  loginTenant: async (req, res) => {
    try {
      const { googleToken } = req.body

      const { email } = await verifyGoogleToken(googleToken)
      // console.log(googleToken)
      const [user] = await User.findOrCreate({
        where: { email },
      })

      if (user.role !== "tenant") {
        throw new Error("tenant not found")
      }

      const token = signToken({
        id: user.id,
      })

      return res.status(201).json({
        message: "User logged in",
        data: user,
        token,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },

  verifyUser: async (req, res) => {
    try {
      const { verification_token } = req.query

      const validToken = validateVerificationToken(verification_token)

      if (!validToken) {
        res.status(401).json({
          message: "Token invalid",
        })
      }

      await User.update(
        { is_verified: true },
        {
          where: {
            id: validToken.id,
          },
        }
      )
      const idUser = validToken.id

      // const toast = useToast()
      // toast({
      //   title: "Verification successful.",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // })
      const findUserByRole = await User.findByPk(idUser)
      if (findUserByRole.role === "tenant") {
        return res.redirect("http://localhost:3000/login/tenant")
      } else {
        return res.redirect("http://localhost:3000/login")
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "server error",
      })
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const findAllUser = await User.findAll()

      return res.status(200).json({
        message: "Get all user",
        data: findAllUser,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server Error",
      })
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params

      const findUserById = await User.findByPk(id, {
        includes: [
          {
            models: db.User,
          },
        ],
      })
      return res.status(200).json({
        message: "Find user by Id",
        data: findUserById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  editUserProfile: async (req, res) => {
    try {
      if (req.file) {
        req.body.profile_picture = req.file.filename
      }

      const findUserByUsernameOrEmail = await User.findOne({
        where: {
          [Op.or]: {
            username: req.body.username || "",
            email: req.body.email || "",
          },
        },
      })

      if (findUserByUsernameOrEmail) {
        return res.status(400).json({
          message: "Username or email has been taken",
        })
      }

      await User.update(
        { ...req.body },
        {
          where: {
            id: req.user.id,
          },
        }
      )
      const findUserById = await User.findByPk(req.user.id)

      return res.status(200).json({
        message: "Edited user data",
        data: findUserById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = authController
