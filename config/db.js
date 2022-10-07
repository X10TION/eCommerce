const mongoose = require('mongoose')
require('dotenv').config()
//  configuring the database here
const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    
    console.log(`MongoDB Connected` )
}
module.exports = connectDB