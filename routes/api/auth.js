const express = require('express');
const router = express.Router();

const usermodel =require('../../models/user');

const jwt=require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcryptjs');
const {check,validationResult} = require('express-validator/check');

const validateToken=require('../../middlewear/validatetoken');


//API --> GET auth, Returns user details when requested with a valid token


router.get("/",validateToken,async (req,res)=>{
    //after middlewear has validated the jwt, we reach here.
    //send back the user details
    try{
        const user=await usermodel.findById(req.user.id).select('-password') //Removed password from the document

        if(!user){
            return res.status(400).json({msg:"User doesnt exists"});
        }
        res.json(user);
    }
    catch(err){
        console.error(err.message)
        return res.status(500).json({msg:'Server Error'});
    }

})


//API --> POST auth, For user to login with valid credentials, evaluates the credentials and returns the token upone succesful login

mw=[
    check('email','Please include valid email').isEmail(),
    check('password','Password is required').exists()
]

router.post("/",mw, async (req,res)=>{

    const errors=validationResult(req);

    //If express validator mw generated any errors, send the errors as reponse and also status code 400
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }   
    const {email,password}=req.body
    console.log(email)
    console.log(password)

    try{

        //Get the user from db    
        let user=await usermodel.findOne({email});

        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid Credentials'}]}) //error message is twekead the same format as val error response
        }

        //Validate the password using bcrypts compare function to match the password with the encrypted password from db
        const isMatch=await bcrypt.compare(password,user.password);

         if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid Credentials'}]})
        }

        //Reached this point, since the credentials are correct, now send back the token to user
        const payload = {
            user:{
                id:user.id,
                ac:"chumma value"
            }
        }

        //Create and sign the token
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

