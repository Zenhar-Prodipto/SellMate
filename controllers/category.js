
const Category = require('../models/category'); //We need the model
const {errorHandler} = require('../helpers/dbErrorHandlers');


exports.create = (req,res)=>{
    const category = new Category(req.body);
    category.save((err,category_data)=>{
        if(err){
            return res.status(400).json({
                err:errorHandler
            });
        };
        res.json({category_data})
    });
};