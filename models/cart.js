const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
    }],
    total: { type: Number, default: 0 }
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart