const express = require("express")
const authController = require("../controllers/authController")
const { upload } = require("../lib/uploader")
const router = express.Router()

router.post("/register", 
upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "KTP"
}).single("ktp"),
authController.register)

router.post("/login/google", authController.loginWithGoogle)

module.exports = router
