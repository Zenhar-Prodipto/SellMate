const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
  create,
  listOrders,
  getStatusValues,
  updateOrderStatus,
  orderById,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.get(
  "/order/create/:userId",
  requireSignin,
  addOrderToUserHistory,
  decreaseQuantity,
  create
),
  router.get("/order/list/:userId", requireSignin, isAdmin, listOrders);

router.get(
  "/order/status-values/:userId",
  requireSignin,
  isAdmin,
  getStatusValues
);

router.put(
  "/order/:orderId/status/:userId",
  requireSignin,
  isAdmin,
  updateOrderStatus
);
router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
