const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandlers");
const router = require("../routes/auth");

exports.productById = (req, res, next, id) => {
  //Grab the id from db
  Product.findById(id)
    // .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = new Product(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        console.log("PRODUCT CREATE ERROR ", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.update = (req, res) => {
  //Form from formidable
  let form = new formidable.incomingForm();
  form.keepExtensions = true;

  //Parse the form data
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded!!",
      });
    }

    //Check for all the fields
    const { name, description, quantity, category, price, shipping } = fields;

    if (
      !name ||
      !description ||
      !quantity ||
      !category ||
      !price ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    //grab product by id
    let product = req.product;
    product = _.extend(product, fields);

    //check for photo sizr and if everything's cool then read file
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image too big (that's what she said)",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      priduct.photo.contenttype = files.photo.type;
    }
  });

  //save it

  product.save((err, result) => {
    if (err) {
      error: errorHandler(err);
    }

    res.json({
      result,
      message: "Product uploaded successfully",
    });
  });
};

exports.remove = (req, res) => {
  //grab from product ID
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      deletedProduct,
      messgae: "Successfully deleted",
    });
  });
};
