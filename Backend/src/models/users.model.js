const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min:18,
        max:100 
    },
    gender: {
        type: String,
        validate(value){
            if (!["male","female", "others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/626fd8140423801.6241b91e24d9c.png'
    },
    about: {
        type: String,
        default: 'This is a default about of the user!!'
    },

    skills: {
        type: [String],
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)

