const express = require("express");
const router = express.Router()

// Imports from Controllers

const {create}  = require("../controllers/category");
const {requireSignin,isAdmin,isAuth} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const { route } = require("./auth");

//Imports from others

//Routes

router.post("/category/create/:userId",requireSignin,isAdmin, create);
router.param('userId',userById);

module.exports = router; 