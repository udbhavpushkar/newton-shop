const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv/config")

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
        const existingUser = await User.findOne({ email: reqBody.email })

        if (existingUser) {
            // if yes => match password
            //compare req body password with the password stored in database
            const passwordMatched = await bcrypt.compare(reqBody.password, existingUser.password)
            if (passwordMatched) {
                //succesfull loggin

                //generate token here and send it in response
                //we will encode _id of user
                const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY)
                // const token = jwt.sign({ name: "Sean paul", email: "sean@gmail.com" }, "NEWTON_SECRET")
                const reponseData = { _id: existingUser._id, name: existingUser.name, email: existingUser.email, token: token }
                res.status(200).json(reponseData)
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