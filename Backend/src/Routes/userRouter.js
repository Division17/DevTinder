const express = require('express')
const ConnectionRequest = require('../models/connectionRequest.js')
const { userAuth } = require('../middlewares/Auth.js')

const userRouter = express.Router();

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const requests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }
        ).populate("fromUserId", "firstName lastName age gender skills about")

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
                { toUserId: loggedInUser._id, status: 'accepted' },

            ]
        }).populate("fromUserId", "firstName lastName age skills about photoUrl")
            .populate("toUserId", "firstName lastName age skills about photoURL")

            const data = connections.map((row)=>{
               if(row.fromUserId._id.toString() === loggedInUser._id.toString() ){
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

module.exports = { userRouter };