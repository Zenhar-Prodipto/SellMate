const express = require("express");
const router = express.Router();

// Imports from Controllers

const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { route } = require("./auth");
const category = require("../models/category");

//THIS.Controller
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

//Imports from others

//Routes

router.post("/category/create/:userId", requireSignin, isAdmin, create);
router.get("/category/:categoryId", requireSignin, read);
router.put("/category/:categoryId/:userId", requireSignin, isAdmin, update);
router.delete("/category/:categoryId/:userId", requireSignin, isAdmin, remove);
router.get("/categories", requireSignin, list);
router.get("/allcategories", requireSignin, list);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
