const express = require("express")
const roomController = require("../controllers/roomController")
const { upload } = require("../lib/uploader")

const router = express.Router()

router.get("/", roomController.getAllRoom)

router.get("/:id", roomController.getRoom)
router.post(
  "/createroom",
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "picture_url",
    maxSize: 1 * 1024 * 1024,
  }).array("picture_url", 6),
  roomController.createRoom
)
router.post(
  "/addimageroom/:id",
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "picture_url",
    maxSize: 1 * 1024 * 1024,
  }).single("picture_url"),
  roomController.postImageRoom
)

router.delete("/delete/:id", roomController.deleteRoom)
router.delete("/deleteimage/:id", roomController.deleteImageRoom)
router.patch("/editroom/:id", roomController.editRoomInfo)

module.exports = router
