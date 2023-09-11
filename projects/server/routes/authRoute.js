const express = require("express")
const authController = require("../controllers/authController")
const { verifyToken, tenant } = require("../middlewares/authMiddleware")
const { upload } = require("../lib/uploader")
const router = express.Router()
const maxSize = 1 * 1024 * 1024

router.post("/register-user", authController.registerUser)
router.post(
  "/register-tenant",
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "KTP",
  }).single("ktp"),
  authController.registerTenant
)

router.get("/refresh-token", verifyToken, authController.refreshToken)
router.post("/login-user", authController.loginUser)
router.post("/login-tenant", authController.loginTenant)
router.get("/verification", authController.verifyUser)

router.get("/users", authController.getAllUsers)
router.get("/users/:id", authController.getUserById)

router.patch(
  "/me",
  verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg", "gif"],
    filePrefix: "PICT",
    limits: {
      maxSize: 1 * 1024 * 1024,
    },
  }).single("profile_picture"),
  authController.editUserProfile,
  (error, req, res, next) => {
    // Check if an error occurred while uploading the file
    if (error) {
      // An error occurred, so check the error code to determine the reason
      switch (error.code) {
        case "LIMIT_FILE_SIZE":
          // File is too large
          return res.status(400).send({
            success: false,
            message: "File size must be less than 1 megabyte",
          })
        case "LIMIT_UNEXPECTED_FILE":
          // Unexpected field
          return res.status(400).send({
            success: false,
            message: "Unexpected field",
          })
        default:
          // Unknown error
          return res.status(500).send({
            success: false,
            message: "An error occurred while uploading the file",
          })
      }
    } else {
      // No error occurred, so continue processing the request
      next()
    }
  }
)

module.exports = router
