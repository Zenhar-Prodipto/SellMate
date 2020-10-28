const router = require("../routes/users");

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


// const signup = (req,res)=>{
// res.send("sign up");
// };

// module.exports = signup;