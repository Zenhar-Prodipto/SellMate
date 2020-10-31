const mongoose = require('mongoose');

const { timeStamp } = require('console');

const categorySchema = new mongoose.Schema({

       name: {
           type: String,
           trim: true,
           require: true,
           maxlength: 40
       }
},
{timeStamp:true},
);




module.exports = mongoose.model("Category",categorySchema );