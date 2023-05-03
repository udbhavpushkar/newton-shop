const Cart = require("../models/cart")
const Order = require("../models/order")

const createOrder = async (req, res) => {
    const { cartId, name, email, address } = req.body
    try {
        console.log(req.body);
        const cart = await Cart.findById(cartId).populate("items.productId")

        if (!cart) {
            throw "Cart not found"
        }

        let totalPrice = 0
        cart.items.forEach(item => {
            totalPrice += item.productId.price * item.quantity
        });

        const items = cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity
        }))

        const order = new Order({
            items: items,
            name: name,
            email: email,
            address: address,
            total: totalPrice,
        })

        const savedOrder = await order.save()

        await Cart.findByIdAndUpdate(cartId, { items: [] })

        res.status(200).json(savedOrder)

    } catch (error) {
        res.status(400).json(error)
    }

}

module.exports = { createOrder }