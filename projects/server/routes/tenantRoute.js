const express = require("express")
const tenantController = require("../controllers/tenantController")

const router = express.Router()

router.get("/:id", tenantController.getTenant)

module.exports = router
