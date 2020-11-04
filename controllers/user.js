// const router = require("../routes/auth");
const router = require("../routes/user");

const User = require("../models/users");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    req.profile = user;
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
    { _id: req.profile.id }, //check for id
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
