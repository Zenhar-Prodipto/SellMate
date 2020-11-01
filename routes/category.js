const express = require("express");
const router = express.Router();

// Imports from Controllers

const { create, categoryById, read } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { route } = require("./auth");
const category = require("../models/category");

//Imports from others

//Routes

router.post("/category/create/:userId", requireSignin, isAdmin, create);
router.param("userId", userById);

router.get("/category/:categoryId", requireSignin, isAdmin, read);
router.param("categoryId", categoryById);

module.exports = router;
