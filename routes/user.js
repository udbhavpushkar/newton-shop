const express = require("express")
const router = express.Router()

//Import controllers
const { registerUser } = require("../controller/user")

router.post("/register", registerUser)

module.exports = router