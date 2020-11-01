const express = require("express");
const router = express.Router();

//Controllers
const {
  create,
  productById,
  read,
  remove,
  update,
} = require("../controllers/product");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandlers");
const product = require("../models/product");

//Routes
// router.post("/product/create/:userId", requireSignin, create);
router.post("/product/create/:userId", requireSignin, create);
router.param("userId", userById);

router.get("/product/:productId", read);
router.param("productId", productById);

router.delete("/product/:productId/:userId", remove);
router.put("/product/:productId/:userId", update);
module.exports = router;
