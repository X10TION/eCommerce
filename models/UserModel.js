const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: [true, 'Username is required'],
        unique: true},
    email: {
        type:String,
        require: [true, 'email is required'],
        unique: true
    },
    password: {
        type:String,
        require: true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }

   
},{
    timestamps: true
})
module.exports = mongoose.model("User", UserSchema)