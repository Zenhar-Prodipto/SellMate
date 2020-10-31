const express = require("express");
const router = express.Router()

//Controllers
const {create} = require("../controllers/product");
const{requireSignin,isAdmin,isAuth} = require("../controllers/auth");
const {userById} = require("../controllers/user");


//Routes
router.post("/product/create/:userId",requireSignin, create);
router.param('userId',userById);

module.exports = router;