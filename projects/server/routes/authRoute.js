const express = require("express")
const authController = require("../controllers/authController")
const { verifyToken } = require("../middlewares/authMiddleware")
const { upload } = require("../lib/uploader")
const router = express.Router()
const maxSize = 1 * 1024 * 1024

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/refresh-token", verifyToken, authController.refreshToken)
router.post("/login/google", authController.loginWithGoogle)

router.get("/users", authController.getAllUsers)
router.get("/users/:id", authController.getUserById)

router.patch(
  "/me",
  verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg", "gif"],
    filePrefix: "PICT",
    limits: {
      fileSize: maxSize,
    },
  }).single("profile_picture"),
  authController.editUserProfile
)

module.exports = router
