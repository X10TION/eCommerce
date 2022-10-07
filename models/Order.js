const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId:{
        type:String,
        require: true},
    product: [
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default: 1
            }
        }
    ],
    amount: {
        type:Number,
        require: true
    },
    address:{type: Object,
                require: true    
    },
    status: {
        type: String,
        default:"Panding"
    }
   
},{
    timestamps: true
})
module.exports = mongoose.model("Order", UserSchema)