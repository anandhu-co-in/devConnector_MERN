const express = require('express');
const router = express.Router();
const usermodel =require('../../models/user');
const gravatar = require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');


//the express validator is used to create middlewears to validate the data
//if any errors with the name, email etc that is returned
const {check,validationResult} = require("express-validator");



// PUBLIC API TO REGISTER USER 
// Local URL http://localhost:3001/api/users

mw=[
    check('name','Name is required').not().notEmpty(),
    check('email','Please include valid email').isEmail(),
    check('password','Please enter valid password with 6 or more charectors').isLength({min:6})
]


router.post("/",mw, async (req,res)=>{

    const errors=validationResult(req);

    //If express validator mw generated any errors, send the errors as reponse and also status code 400
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});   // error arry is like [{},{}..], we make it {"errors":[{},{}..]}
    }   

    const {name,email,password}=req.body

    try{

    //If user exists
    
    let user=await usermodel.findOne({email});

    if(user){
        //error message is twekead the same format as val error response
        return res.status(400).json({errors:[{msg:'User already exists'}]})
    }

    //Get users gravatar (what that hell is that?!-google it)
        //s is size, pg no naked, mm if no avar, then give default
    const avatar=gravatar.url(email,{s:'200',r:'pg',d:'mm'})

    //Encrypt password
    const salt = await bcrypt.genSalt(10) // increase to make more secure
    encryptedpassword=await bcrypt.hash(password,salt);

    //Create user object
    user=new usermodel({
        name,
        email,
        avatar,
        password:encryptedpassword //Here like this because,both sides diff name
    })

    //save user - So, if user collection doesnt exist, may be when you run the first time, is is created in the Atlast

    await user.save() //anything that returns promise use await

    //Return json webtoken   [header].[payload].[signature]

    //Lets create the payload object to include
    const payload = {
        user:{
            id:user.id,
            ac:"chumma value"
        }
    }

    //Create and sign the token, and return it as API response
    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:config.get('tokenExpiry')}, //Expires in values is in seconds, Set to high for testing. Reduce it to (1 hr ?) before deploying to prod env
        (err,token)=>{
            if(err){
                throw err;
            }
            else{
                res.json({token});
            }
        });

    }catch(err){
        console.log("Server Error");
        res.status(500).send("Server error "+err);
    }

})


module.exports=router;

