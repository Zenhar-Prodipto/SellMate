const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

const Product = require("../models/product"); //importing product model as Product
const {errorHandler} = require('../helpers/dbErrorHandlers');

//we need formidable form to handle the photos
exports.create = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; // keep the extension of the photo.

    form.parse(req,(err,fields,files)=>{
        if (err){
            return res.status(400).json({
                error:"Image could not be uploaded."
            })
        }
        let product = new Product(fields);
        if (files.photo){
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contenttype = files.photo.type
        }

        //if everything goes well we'll save it.
        product.save((err,result)=>{
            if (err){
                return res.status(400).json({
                    error: errorHandler
                })
            }

            res.json(result)
        });
    });

};