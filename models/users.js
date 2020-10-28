 const mongoose = require('mongoose');
 const crypto = require('crypto')
//  var uuid = require('uuid');
//  const uuidv1 = require('uuid/v1');
const { v4: uuidv4 } = require('uuid');
const { timeStamp } = require('console');

 const userSchema = new mongoose.Schema({

        name: {
            type: String,
            trim: true,
            require: true,
            maxlength: 40
        },

        email: {
            type: String,
            trim: true,
            require: true,
            maxlength: 40,
            unique:true
        },

        hashed_password: {
            type: String,
            require: true,
        },

        about: {
            type: String,
            trim: true,
        
        },

        salt: String,

        role:{
            type:Number,
            default:0, //0 for users and 1 for admins
        },


        history: {
            type:Array,
            default:[],
        }
    },

 {timeStamp:true}
 );

 //Virtual field

 userSchema.virtual("password")
 .set (function(password){
     this._password = password;
     this.salt = uuidv4();
     this.hashed_password=this.encryptPassword(password);
 })

 .get(function(){
     return this._password;
 })

 userSchema.methods = {
     encryptPassword: function(password){
         if (!password) return '';
         try {
             return crypto.createHmac('sha1',this.salt)
             .update(password)
             .digest("hex")
         } catch(err){
             return ''
         }
     }
 }

 module.exports = mongoose.model("User",userSchema );