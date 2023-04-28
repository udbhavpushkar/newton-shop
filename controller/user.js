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

            //Create user object
            const data = new User({ ...reqBody, password: encryptedPassword })

            //save it to database
            const savedData = await data.save()
            res.status(200).json(savedData)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

const loginUser = async (req, res) => {
    try {
        //read email and password given by user
        let reqBody = req.body

        //check email exist in our database
        const existingData = await User.findOne({ email: reqBody.email })

        if (existingData) {
            // if yes => match password
            //compare req body password with the password stored in database
            const passwordMatched = await bcrypt.compare(reqBody.password, existingData.password)
            if (passwordMatched) {
                //succesfull loggin
                res.status(200).json(existingData)
            } else {
                throw "Incorrect Password !"
            }
        } else {
            //if no => user is not registered
            throw "User is not registered !"
        }
    } catch (error) {
        res.status(400).json(error)
    }

}

module.exports = { registerUser, loginUser }