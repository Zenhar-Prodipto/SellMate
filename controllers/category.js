const Category = require("../models/category"); //We need the model
const { errorHandler } = require("../helpers/dbErrorHandlers");

exports.categoryById = (req, res, next, id) => {
  //grab the id from the model
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Couldn't find the category",
      });
    }

    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category_data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler,
      });
    }
    res.json({ category_data });
  });
};

exports.read = (req, res) => {
  let category = req.category;

  return res.json({
    category,
  });
};
