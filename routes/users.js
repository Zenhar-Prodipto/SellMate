const express = require ("express");
const router = express.Router()

const {signup} = require("../controllers/users");
// const signup = require("../controllers/users"); //added later
const {userSignUpVaidator} = require('../validators'); 

router.post('/signup', userSignUpVaidator, signup);

module.exports = router; 