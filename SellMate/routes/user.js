const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { updatez } = require("lodash");

//THIS.CONTROLLER

const { userById, read, update } = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAdmin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", read);
router.put("/user/:userId", requireSignin, update);

router.param("userId", userById);

module.exports = router;
