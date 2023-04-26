const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, maxLength: 50 },
    price: { type: Number },
    category: { type: String, required: true },
    details: { type: String }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product