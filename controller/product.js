const Product = require("../models/product");

const createProduct = async (req, res) => {
    try {
        //grab input data from req body
        const reqBody = req.body
        console.log(reqBody);
        // create product object 
        const data = new Product(reqBody)
        //save product in database
        const savedData = await data.save()
        //send response
        res.status(200).json(savedData)
    } catch (error) {
        res.status(400).json({ error })
        // {name: name} == {name}
    }
}

const listProducts = async (req, res) => {
    try {
        let filters = req.query
        //get list from db ({ category: "laptop" })
        const data = await Product.find(filters).sort({ price: -1 })
        //send it as response
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = { createProduct, listProducts }