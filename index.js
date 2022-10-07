const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const User = require('./routes/User')
const auth = require('./routes/Auth')
dotenv.config({path: './config/config.env'})

connectDB()
//  initialized the application
const app = express()

// Middleware application
app.use(express.json())

app.use("/api/v1/user", User)
app.use("/api/v1/auth", auth)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} MODE ON PORT ${PORT}`))
// Handle Unhandle promise rejection
process.on('unhandleRejection', (err, promise) => {
    console.log(`Error: ${err.message.red.bold}`)
    // close the server
    server.close(() => process.exit(1))
})