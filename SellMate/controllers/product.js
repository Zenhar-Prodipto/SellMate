const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandlers");
const { orderBy } = require("lodash");
const { runInNewContext } = require("vm");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
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

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
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
      // console.log("FILES PHOTO: ", files.photo);
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

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      deletedProduct,
      message: "Product deleted successfully",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
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
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.list = (req, res) => {
  //We need to sort out the most popular product in the front end
  //for that we need order, sort by and limit.

  let order = req.query.order ? req.query.order : "asc"; //if query is order, then grab that order. else do ascending
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit
    ? parseInt(req.query.limit)
    : parseInt(req.query.length);

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, list) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found!",
        });
      }
      res.json(list);
    });
};

exports.relatedProducts = (req, res) => {
  //grab the similar products based on category but exclude the base product
  let limit = req.query.limit ? parseInt(req.body.limit) : 4;

  Product.find({ _id: { $ne: req.product }, category: req.product.category }) //ne = not including
    .limit(limit)
    .select("-photo") //Not including picture
    .populate("Category", "_id name") //specifying that we only need id and name from category
    .exec((err, relatedProducts) => {
      if (err) {
        return res.status(400).json({
          error: "No related product. It failed",
        });
      }
      res.json(relatedProducts);
    });
};

exports.categoryList = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Catergoy list failed",
      });
    }
    res.json(categories);
  });
};

exports.categoryList2 = (req, res) => {
  Product.find()
    .select("-photo")
    .populate("category")
    .distinct("category")
    .exec((err, list) => {
      if (err) {
        return res.status[400].json({
          error: "Failed to list the categories",
        });
      }
      res.json(list);
    });
};

exports.listBySearch = (req, res) => {
  let order = req.query.order ? req.query.order : "desc"; //if query is order, then grab that order. else do ascending
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  let skip = parseInt(req.query.skip);
  let findArgs = {}; //will contain category ID and range

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(JSON.stringify(req.body));

  console.log(JSON.stringify(findArgs));

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(skip)
    .exec((err, list) => {
      if (err) {
        return res.status[400].json({
          error: "Failed to list the categories",
        });
      }
      res.json(list);
    });
};

// exports.productPhoto = (req, res, next) => {
//   if (req.product.photo.data) {
//     res.set("Content-Type: ", req.product.photo.contentType);
//     return res.send(req.product.photo.data);
//   }
//   next();
// };
exports.productPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};
exports.decreaseQuantity = (req, res, next) => {
  let bulkOrs = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: {
          $inc: {
            quantity: -item.count,
            sold: +item.count,
          },
        },
      },
    };
  });
  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update product",
      });
    }
    next();
  });
};
