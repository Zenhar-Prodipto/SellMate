const { order, cartItem, Order } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandlers");
const { json } = require("express");

exports.orderById = (req, res, id, next) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  req.body.order.user = req.user; //req.user is req.profile basically

  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  //req.body.orderId aamra front end theke nibo
  Order.update({ _id: req.body.orderId }),
    { $set: { status: req.body.status } },
    (err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    };
};
