const Cart = require("../models/cart")

const createCart = async (req, res) => {
    try {
        //Create a cart with data given
        const reqBody = req.body
        const data = new Cart({ ...reqBody })
        const savedData = await data.save()
        res.status(200).json(savedData)
    } catch (error) {
        res.status(400).json(error)
    }
}

const getCart = async (req, res) => {
    try {
        const currentUserId = req.user._id
        const data = await Cart.findOne({ user: currentUserId }).populate("user", "name email").populate("items.productId")
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
}

const addItemToCart = async (req, res) => {
    try {
        //take cart id from user in req object
        const cartId = req.params.id

        //add product in item array
        const productid = req.body.productId

        const updatedCart = await Cart.findByIdAndUpdate(cartId, { $push: { items: { productId: productid } } }, { new: true })

        //update the document

        // send the response
        res.status(200).json(updatedCart)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

}

const updateQuantity = async (req, res) => {
    try {
        const cartId = req.params.id
        const { productId, updatedQuantity } = req.body

        //find your cart by id
        const cart = await Cart.findById(cartId)

        //find item in items array by productId
        const item = cart.items.find(item => item.productId._id == productId)

        if (item) {
            if (updatedQuantity == 0) {//remove from item array
                const index = cart.items.findIndex(item => item.productId._id == productId)
                cart.items.splice(index, 1)
            } else {
                item.quantity = updatedQuantity
            }

        } else {
            throw "Item is not in the cart"
        }

        await cart.save()

        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = { createCart, addItemToCart, getCart, updateQuantity }