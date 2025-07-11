const express = require('express');
const { connectDB } = require('./src/configs/database.js')
const User = require('./src/models/users.model.js')
const { validateSignUp, validateLogin } = require('./src/utility/Validations.js')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express()

const PORT = 8000

app.use(express.json())
app.use(express.urlencoded(true))
app.use(cookieParser())

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            sucess: true,
            data: users
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error.message
        })

        console.log(error)
    }
})

app.get('/profile', async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            throw new Error("User not authenticated")
        } else {
          const decode = await jwt.verify(token,"secrect key 123321")
          const user = await User.findById(decode.userId)
          if(!user){
            throw new Error("User not found")
          }else{
            res.status(200).json({
                success:true,
                message:"user found",
                data:user
            })
          }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

app.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        validateSignUp(req)
        const { firstName, lastName, emailId, password, age, skills, about, photoUrl } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,
            lastName,
            emailId,
            age,
            skills,
            about,
            photoUrl,
            password: hashPassword
        })
        await user.save()
        console.log('Registration Sucessfull')
        res.status(200).json({
            sucess: true,
            message: 'Registration sucessfull'
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: error.message
        })

        console.log(error)
    }
})

app.post('/login', async (req, res) => {
    try {
        validateLogin(req)
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId })
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'credentials are wrong.'
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (checkPassword) {
            const token = await jwt.sign({userId:user._id}, "secrect key 123321")
            res.cookie("token", token)
            res.status(200).json({
                success: true,
                message: 'Login successful'
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: 'credentials are wrong.'
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({ _id: userId });
        res.status(200).json({
            success: true,
            message: 'User deleted sucessfully',
            data: user
        })
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

//fix it later

app.patch('/user', async (req, res) => {
    const data = req.body;
    const userId = data.userId;
    try {
        const allowed_updates = ["photoUrl", "about", "age", "gender", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => allowed_updates.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update is not allowed")
        }
        if (data.skills.length > 10) {
            throw new Error("Skills can not be more than 10")
        }
        await User.findByIdAndUpdate(userId, data, { runValidators: true })
        res.status(200).json({
            success: true,
            message: 'User updated sucessfully'
        })
    } catch (error) {
        res.status(400).send("Error in updating " + error.message)
        console.log(error)
    }
})

connectDB().then(() => {
    console.log('Connection Established')
    app.listen(PORT, () => {
        console.log("Server is Running")
    })
})
    .catch((err) => {
        console.log("Error: " + err)
    })
