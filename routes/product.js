const express = require("express")

const { createProduct, listProducts } = require("../controller/product.js")

const router = express.Router()

router.post("/", createProduct)
router.get("/", listProducts)

module.exports = router