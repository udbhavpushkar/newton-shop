//create server
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//Routes imports
const productRoutes = require("./routes/product.js")
const userRouter = require("./routes/user.js")

const app = express()
const PORT = 8009

//Handle cross origin request
app.use(cors())

//Url encoding parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//APIs
app.use("/product", productRoutes)
app.use("/user", userRouter)

mongoose.connect('mongodb://127.0.0.1:27017/julyshop');

app.listen(PORT, () => {
    console.log("Listining to PORT " + PORT)
})