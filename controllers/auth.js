const router = require("../routes/auth");
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // For Authorization Check
const User = require('../models/users');

const {errorHandler} = require('../helpers/dbErrorHandlers');
const users = require("../models/users");

exports.signup= (req,res)=>{
    console.log("req bdy",req.body);
    const user =  new User(req.body)

    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:errorHandler(err)
            });
        }

            user.salt = undefined;
            user.hashed_password = undefined
        res.json({
            user
        });
    });
};

exports.signin = (req,res)=>{
    //Finding the user based on Email
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        if (err || !user){
            return res.status(400).json({
                error: "email doesn't exist"
            });
        }

        //if user is found, check email and password
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "email or password didn't match"
            });
        };

        //generate a signed token in user id

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        //cookies with expiry date. t is token here.
        res.cookie('t',token, {expire:new Date()+9999})

        //Token to front end client

        const {_id, name, email, role} = user

        return res.json({token,user:{_id,email,name, role}})



    });
 };


exports.signout = (req,res)=>{
res.clearCookie('t');
res.json({message:"Successfully signed out"})
};


exports.requireSignin= expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth"
});