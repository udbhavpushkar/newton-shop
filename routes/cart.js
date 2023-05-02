const express = require("express")
const { createCart, addItemToCart, getCart } = require("../controller/cart")
const { authorize } = require("../middleware/auth")

const router = express.Router()

router.post("/", createCart)
router.post("/addItem/:id", addItemToCart)
router.get("/get", authorize, getCart)

module.exports = router