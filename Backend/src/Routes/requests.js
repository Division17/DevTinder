const express = require('express')
const { userAuth } = require('../middlewares/Auth.js')
const User = require('../models/users.model.js')
const connectionRequest = require('../models/connectionRequest.js')
const requestRouter = express.Router()

requestRouter.post('/connectionRequest/:status/:toUserId', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const fromUserId = req.user._id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;

    const allowedStatus = ["ignored", "interested"]
    const isAllowedStatus = allowedStatus.includes(status)
    if (!isAllowedStatus) {
      throw new Error('Status values not valid')
    }

    const toUser = await User.findById(toUserId)
    if (!toUser) {
      throw new Error("User to whom you have sent request doesn't exists")
    }

    const checkExistence = await connectionRequest.findOne  ({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    })

    if (checkExistence) {
      throw new Error('Connection request exists, already.')
    }

    const requestData = new connectionRequest({
      fromUserId,
      toUserId,
      status
    })

    const data = await requestData.save()
    const connectionMessage = (status === "ignored") ? loggedInUser.firstName + " ignored " + toUser.firstName : loggedInUser.firstName + " is interested in " + toUser.firstName
    res.status(200).json({
      success: true,
      message: connectionMessage,
      data
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: true,
      message: error.message
    })
  }
})

module.exports = {
  requestRouter
}