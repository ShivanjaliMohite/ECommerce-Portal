const express=require("express");
const router=express.Router();
const {signout,signup,signin,isSignedIn}=require("../controllers/auth.js")
const {check,validationResult}=require("express-validator")

router.get("/signout",signout)
router.post("/signup",[
    check("name","name should contain at least 3 characters").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should contain at least 3 characters").isLength({min:3})
],signup)

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password field is required").isLength({min:1})
],signin)

router.get("/testroute",isSignedIn,(req,res)=>{
    res.send(req.auth)
})

module.exports=router;



