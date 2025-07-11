const express = require('express');
const { connectDB } = require('./src/configs/database.js')
const User = require('./src/models/users.model.js')

const app = express()

const PORT = 8000

app.use(express.json())
app.use(express.urlencoded(true))

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

app.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        console.log('Registration Sucessfull')
        res.status(200).json({
            sucess: true,
            message: 'Registration sucessfull'
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: 'Not able to register'
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
            data:user
        })
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

app.patch('/user', async (req, res) => {
    const data = req.body;
    const userId = data.userId;
    try {
        await User.findByIdAndUpdate(userId , data, {returnDocument:"after"})
        res.status(200).json({
            success: true,
            message: 'User updated sucessfully'
        })
    } catch (error) {
        res.status(400).send("Something went wrong")
        console.log(error)
    }
})

connectDB().then(() => {
    console.log('Connection Establisher')
    app.listen(PORT, () => {
        console.log("Server is Running")
    })
})
    .catch((err) => {
        console.log("Error: " + err)
    })
