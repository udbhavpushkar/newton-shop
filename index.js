//create server
const express = require("express")
const mongoose = require("mongoose")

//Routes imports
const productRoutes = require("./routes/product.js")

const app = express()
const PORT = 8009

//Url encoding parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//APIs
app.use("/product", productRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/julyshop');

app.listen(PORT, () => {
    console.log("Listining to PORT " + PORT)
})