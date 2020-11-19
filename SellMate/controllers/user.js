// const router = require("../routes/auth");
const router = require("../routes/user");
const { errorHandler } = require("../helpers/dbErrorHandlers");
const User = require("../models/users");
const { Order } = require("../models/order");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    req.profile = user; //profile change kore user kora chhilo first e
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined; //this will not be sent
  req.profile.salt = undefined; // this will not be sent

  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id }, //check for id
    { $set: req.body }, //will take any field in the body to update
    { new: true }, // updated = true
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Error updating the profile",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];
  req.body.products.array.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Could Not Update User Purchase History",
        });
      }

      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};
