const express = require('express')
const ConnectionRequest = require('../models/connectionRequest.js')
const { userAuth } = require('../middlewares/Auth.js');
const userRouter = express.Router();
const User = require('../models/users.model.js')

const userSafeFeilds = "firstName lastName age gender about photoUrl";

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const requests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }
        ).populate("fromUserId", userSafeFeilds)

        res.status(200).json({
            success: true,
            message: 'Requests Found',
            requests
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'accepted' },
                { toUserId: loggedInUser._id, status: 'accepted' },]
        }).populate("fromUserId", userSafeFeilds)
            .populate("toUserId", userSafeFeilds)

        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        })
        res.status(200).json({
            success: true,
            message: 'Connections found',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

userRouter.get('/feed', userAuth, async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 30
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const loggedInUser = req.user

        const allconnections = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }]
        }).select("fromUserId toUserId")

        const hiddenUsers = new Set();
        allconnections.forEach((req) => {
            hiddenUsers.add(req.fromUserId.toString())
            hiddenUsers.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hiddenUsers) } },
                { _id: { $ne: loggedInUser._id } }]
        }).select(userSafeFeilds)
            .skip(skip)
            .limit(limit)

        res.status(200).json({
            success: true,
            message: 'feed fetched.',
            data: users
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = { userRouter };