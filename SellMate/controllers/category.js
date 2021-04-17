const Category = require("../models/category"); //We need the model
const { errorHandler } = require("../helpers/dbErrorHandlers");
const { remove } = require("lodash");

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
    //object akare pathaisi
    category,
  });
};

exports.update = (req, res) => {
  let category = req.category;
  category.name = req.body.name;

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "failed to save category",
      });
    }

    res.json({
      data,
      massage: "Successful",
    });
  });
};

exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete category",
      });
    }

    res.json({
      data,
      massage: "Successful",
    });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, list) => {
    if (err) {
      return res.status(400).json({
        error: "error finding the list",
      });
    }
    res.json(list);
  });
};
