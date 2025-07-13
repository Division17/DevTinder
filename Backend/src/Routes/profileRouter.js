const express = require('express')
const User = require('../models/users.model.js')
const jwt = require('jsonwebtoken')
const { userAuth } = require('../middlewares/Auth.js')
const { validateProfileEdit } = require('../utility/Validations.js')

const profileRouter = express.Router()

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            throw new Error("User not authenticated")
        } else {
            const { _id } = await jwt.verify(token, "secrect key 123321")
            const user = await User.findById(_id)
            if (!user) {
                throw new Error("User not found")
            } else {
                res.status(200).json({
                    success: true,
                    message: "user found",
                    data: user
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error
        })
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if (!validateProfileEdit(req)) {
            throw new Error("Invalid field present.")
        } else {
            const loggedInuser = req.user
            Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]))
            await loggedInuser.save()
            res.status(200).json({
                success: true,
                message: `${loggedInuser.firstName} profile updated succesfully.`
            })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = {
    profileRouter
}