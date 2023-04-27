const User = require("../models/user")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    try {
        //register user / create user
        // read data from req body
        let reqBody = req.body
        //check email is already exist
        const existingData = await User.findOne({ email: reqBody.email })
        // if exist => show error
        if (existingData) {
            // show error
            throw "User already exist"
        } else {
            //else => create user
            //encrypt password

            const salt = await bcrypt.genSalt(10)
            const encryptedPassword = await bcrypt.hash(reqBody.password, salt)

            const data = new User({ ...reqBody, password: encryptedPassword })

            const savedData = await data.save()
            res.status(200).json(savedData)
        }
    } catch (error) {
        res.status(400).json(error)

    }
}

module.exports = { registerUser }