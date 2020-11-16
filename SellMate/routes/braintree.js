const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, paymentProcess } = require("../controllers/braintree");

router.get("/braintree/getToken/:userId", requireSignin, generateToken);
router.get("/braintree/payment/:userId", requireSignin, paymentProcess);

router.param("userId", userById);

module.exports = router;
