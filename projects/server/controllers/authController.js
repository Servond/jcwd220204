const { Op } = require("sequelize")
const db = require("../models")
const User = db.User
const bcrypt = require("bcrypt")
const { signToken } = require("../lib/jwt")
const { verifyGoogleToken } = require("../lib/firebase")

const authController = {
  registerUser: async (req, res) => {
    try {
      const { email, role } = req.body

      const findUserByEmail = await User.findOne({
        where: { email },
      })

      if (findUserByEmail) {
        return res.status(400).json({
          message: "Another account is using the same email",
        })
      }

      await User.create({
        email,
      })

      return res.status(201).json({
        message: "User registered",
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

      return res.redirect("http://localhost:3000/login")
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
    // const path = "public/"

    // const fileName = await User.findOne({
    //   where: {
    //     profile_picture: req.params.profile_picture,
    //   },
    // })
    // console.log(fileName)

    try {
      if (req.file) {
        // req.body.profile_picture = `http://localhost:8000/public/${req.file.filename}`
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
