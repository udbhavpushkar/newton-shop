const User = require("../models/user")
const jwt = require("jsonwebtoken");
require("dotenv/config")

const authorize = async (req, res, next) => {
    try {

        if (req.headers.authorization) {
            if (req.headers.authorization.startsWith("Bearer")) {

                const token = req.headers.authorization.split(" ")[1]

                //decode it
                const decodedData = jwt.verify(token, process.env.SECRET_KEY)

                //find user of the decodedData id
                const currentUser = await User.findById(decodedData.id)

                if (currentUser) {
                    req.user = currentUser
                    next()
                } else {
                    throw "Not authorized user"
                }

            }
        } else {
            throw "You are not authorized"
        }

    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = { authorize }