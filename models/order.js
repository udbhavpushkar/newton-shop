const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
    }],
    name: { type: String },
    email: { type: String },
    address: { type: String },
    total: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
    date: { type: Date, required: true, default: Date.now }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order