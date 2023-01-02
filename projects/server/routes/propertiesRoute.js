const express = require("express")
const propertiesController = require("../controllers/propertiesController")
const { upload } = require("../lib/uploader")

const router = express.Router()

router.get("/", propertiesController.getAllProperties)
router.get("/:id", propertiesController.getPropertyById)
router.get("/city/:id", propertiesController.getCityId)
// router.get("/room", propertiesController.getRoom)

router.post(
  "/create",
  //   verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "property_img",
    maxSize: 3 * 1024 * 1024,
  }).array("image_url", 6),
  propertiesController.propertyPost
)

router.patch("/edit/:id", propertiesController.propertyUpdate)

router.delete("/delete/:id", propertiesController.propertyDelete)

router.delete("/delete/image/:id", propertiesController.propertyImageDelete)

router.post(
  "/image/:id",
  // verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "property_img",
    maxSize: 2 * 1000000,
  }).single("image_url"),
  propertiesController.propertyImagePost
)
module.exports = router
