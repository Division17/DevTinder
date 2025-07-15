const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
    },

    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type.`
        }
    }
}, {
    timestamps: true
})

connectionRequestSchema.index({ firstName: 1, lastName: 1 })

connectionRequestSchema.pre("save", function () {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('Sender and Receiver cannot be same.')
    }

})

module.exports = new mongoose.model('ConnectionRequest', connectionRequestSchema)