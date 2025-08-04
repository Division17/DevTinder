const express = require('express');
const { connectDB } = require('./src/configs/database.js')
const User = require('./src/models/users.model.js')
const cookieParser = require('cookie-parser')
const { userAuth } = require('./src/middlewares/Auth.js')
const { authRouter } = require('./src/Routes/authRoutes.js')
const { profileRouter } = require('./src/Routes/profileRouter.js')
const { requestRouter} = require('./src/Routes/requests.js')
const { userRouter } = require('./src/Routes/userRouter.js')
const cors = require('cors')

const app = express()
const PORT = 8000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded(true))
app.use(cookieParser())

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)


app.delete("/user", userAuth, async (req, res) => {
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

app.patch('/user', userAuth, async (req, res) => {
    const data = req.body;
    const userId = req.cookies.token
    try {
        const allowed_updates = ["photoUrl", "about", "age", "gender", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => allowed_updates.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update is not allowed")
        }
        // if (data.skills.length > 10) {
        //     throw new Error("Skills can not be more than 10")
        // }
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
