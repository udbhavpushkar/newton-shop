//create server
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")

//Routes imports
const productRoutes = require("./routes/product.js")
const userRouter = require("./routes/user.js")
const cartRouter = require("./routes/cart.js")
const orderRouter = require("./routes/order.js")

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
app.use("/cart", cartRouter)
app.use("/order", orderRouter)

mongoose.connect(process.env.MONGO_URL);

app.listen(PORT, () => {
    console.log("Listining to PORT " + PORT)
})