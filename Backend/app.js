const express = require('express');
const { connectDB } = require('./src/configs/database.js')
const User = require('./src/models/users.model.js')

const app = express()

const PORT = 8000

app.use(express.json())
app.use(express.urlencoded(true))

app.post('/signup',async(req,res) =>{
    const user = new User(req.body)
    try {
      await user.save()
      console.log('Registration Sucessfull')
      res.status(200).json({
        sucess:true,
        message:'Registration sucessfull'
      })  
    } catch (error) {
        res.status(400).json({
            sucess:false,
            message:'Not able to register'
        })}
})


connectDB().then(() => {
    console.log('Connection Establisher')
    app.listen(PORT, () => {
        console.log("Server is Running")
    })
})
.catch((err)=>{
 console.log("Error: "+ err)
})
