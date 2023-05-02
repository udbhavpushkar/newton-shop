const express = require("express")

const { createProduct, listProducts } = require("../controller/product.js")
const { authorize } = require("../middleware/auth.js")

const router = express.Router()

router.post("/", createProduct)
router.get("/", authorize, listProducts)

module.exports = router