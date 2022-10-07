const router = require('express').Router()
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const dotenv = require('dotenv')

//  Register User 
router.post('/register',(req,res) => {
    const {username, password,email} = req.body

// validate username
    if(!username || !password || !email)
                return res.status(400).json({
                    massage: "Please Enter all fields"
                })

                
//  check existing user
        User.findOne({email}).then(user => {
            if(user) return res.status(400).json({
                message: "user already existing"
                })


        const NewUser = new User({
            username: req.body.username,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECKRET).toString(),
            email: req.body.email,
        })

        try{
        const saveUser = NewUser.save().then(user => {
            res.status(201).json({
                id: user.id,
               username: user.username,
               email: user.email
})  
        })
        
        } catch (err){
            res.status(500).json({error:err})  
        }
})
})

//  login router
router.post('/login', async (req, res) => {
    const {username, password } = req.body

    //   validations 
    if(!username || !password){
        return  res.status(400).json({
                massage: "Please Enter all fields"
            })}
            // if user exist or not
    User.findOne({username}).then(user => {
                if(!user)
                    return  res.status(400).json({
                        massage: "No crediantials found, Please creaate an Account"
                    })
                  
                    const hashedPassword = CryptoJS.AES.decrypt(user.password,  process.env.SECKRET);
                    const veriftedpassword = hashedPassword.toString()
                       if( veriftedpassword !== password) 
                        return  res.status(401).json('Wrong credentials passw')
                        

                    return res.status(200).json(user)
                    
            
})
})





module.exports = router