const express = require('express')
const bcrypt = require('bcryptjs')
const { validateLogin, validateSignUp } = require('../utility/Validations.js')
const User = require('../models/users.model.js')

const authRouter = express.Router()


authRouter.post('/signup', async (req, res) => {
    try {
        validateSignUp(req)
        const { firstName, lastName, emailId, password, age, skills, about, photoUrl } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,
            lastName,
            emailId,
            age,
            skills,
            about,
            photoUrl,
            password: hashPassword
        })
        const savedUser = await user.save()
          const token = await user.getJWT();
          res.cookie("token", token, {
            expires: new Date(Date.now() + 691200000),
            httpOnly: true,
          });
          res.status(200).json({
            success: true,
            message: "sign up successful",
            data: savedUser,
          });
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error.message
        })
        console.log(error)
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        validateLogin(req)
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId })
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'credentials are wrong.'
            })
        }

        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
            const token = await user.getJWT()
            res.cookie("token", token, { expires: new Date(Date.now() + 691200000), httpOnly: true })
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data:user
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: 'credentials are wrong.'
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

        console.log(error)
    }
})

authRouter.post('/logout', async (req, res) => {
    try {
        res.cookie("token",null, { expires: new Date(Date.now())})
        res.status(200).json({
            success: true,
            message: 'logout successful'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = {
    authRouter
}