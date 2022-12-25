const express = require("express")
const propertiesController = require("../controllers/propertiesController")

const router = express.Router()

router.get("/", propertiesController.getAllProperties)
router.get("/:id", propertiesController.getPropertyById)
router.get("/city/:id", propertiesController.getCityId)
// router.get("/room", propertiesController.getRoom)

router.post(
  "/",
  //   verifyToken,
  upload({
    acceptedFileTypes: ["png", "jpeg", "jpg"],
    filePrefix: "property_img",
  }).array("image_url", 6),
  propertiesController.propertyPost
)

module.exports = router
