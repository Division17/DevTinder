const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(value + "is not a valid email.")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Use a Strong password.")
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/626fd8140423801.6241b91e24d9c.png',
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid")
            }
        }
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
        timestamps: true
    })

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "secrect key 123321", { expiresIn:'8d'})
    return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser, passwordHash
    )
    return isPasswordValid
}

module.exports = mongoose.model('User', userSchema)

