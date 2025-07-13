const jwt = require('jsonwebtoken')
const User = require('../models/users.model.js');

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || typeof token !== "string") {
            throw new Error("Token not found")
        }
        const decode = await jwt.verify(token, "secrect key 123321")
        const user = await User.findById(decode._id)
        if (!user) {
            throw new Error('No user found')
        }
        req.user = user;
        next();


    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    userAuth
}
