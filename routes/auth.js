const express = require ("express");
const router = express.Router()

const {signup,signin,signout, requireSignin} = require("../controllers/auth");
// const signup = require("../controllers/users"); //added later
const {userSignUpVaidator} = require('../validators'); 



router.post('/signup', userSignUpVaidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/hello', requireSignin,(req,res)=>{
    res.send("Hellow");
})

module.exports = router; 