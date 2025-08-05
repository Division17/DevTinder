const jwt = require('jsonwebtoken')
const User = require('../models/users.model.js');

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || typeof token !== "string") {
            return res.status(401).json({
                success: false,
                message:"Token not Found."
          })
        }
        const decode = await jwt.verify(token, "secrect key 123321")
        const user = await User.findById(decode._id)
        if (!user) {
             return res.status(401).json({
                success: false,
                message:"No user found."
          })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    userAuth
}
