const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrders } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.get(
  "/order/create/:userId",
  requireSignin,
  addOrderToUserHistory,
  decreaseQuantity,
  create
),
  router.post("/order/list/:userId", requireSignin, isAdmin, listOrders);
router.param("userId", userById);

module.exports = router;
