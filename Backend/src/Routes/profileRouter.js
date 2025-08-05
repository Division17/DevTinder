const express = require('express')
const User = require('../models/users.model.js')
const jwt = require('jsonwebtoken')
const { userAuth } = require('../middlewares/Auth.js')
const { validateProfileEdit, validateNewPassword } = require('../utility/Validations.js')
const bcrypt = require('bcryptjs')

const profileRouter = express.Router()

profileRouter.get('/profile/view', userAuth, async (req, res) => {
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
        res.status(401).json({
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
                message: `${loggedInuser.firstName} profile updated succesfully.`,
                data: loggedInuser,
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

profileRouter.patch('/profile/password', userAuth, async (req, res) => {
    try {
        const { password, newPassword, confirmPassword } = req.body;

        const loggedInUser = req.user;
        const comparePassword = await bcrypt.compare(password, loggedInUser.password)
        if (!comparePassword) {
            throw new Error('Current password do not mtach')
        }
        if (newPassword !== confirmPassword) {
            throw new Error("New Password and Confirm Password do not Match.")
        }

        validateNewPassword(newPassword)

        const hashPassword = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = hashPassword;

        await loggedInUser.save()

        res.status(200).json({
            success: true,
            message: 'Password changes successfully.'
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
    profileRouter
}