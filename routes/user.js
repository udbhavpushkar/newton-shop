const express = require("express")
const router = express.Router()

//Import controllers
const { registerUser, loginUser } = require("../controller/user")

router.post("/register", registerUser)
router.post("/login", loginUser)

module.exports = router