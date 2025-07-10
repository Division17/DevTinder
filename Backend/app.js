const express = require('express');
const { connectDB } = require('./src/configs/database.js')

const app = express()

const PORT = 8000

app.use(express.json())
app.use(express.urlencoded(true))


connectDB().then(() => {
    console.log('Connection Establisher')
    app.listen(PORT, () => {
        console.log("Server is Running")
    })
})
.catch((err)=>{
 console.log("Error: "+ err)
})
