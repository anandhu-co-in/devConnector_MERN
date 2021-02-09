const express = require('express');
const router = express.Router();
const tokenValidator=require("../../middlewear/validatetoken");
const userModel=require("../../models/user");
const profileModel=require("../../models/profile");


//API GET --> User request with  token, and this should

//@route GET api/profile/me
//@desc  Get current users profile
//@access Private

router.get("/me",tokenValidator,async (req,res)=>{
    res.send("profile route")

    //Here because the token is valid

    try{

        //Get the user profile matching the id

        const profile= await profileModel.findOne({user:req.user.id}).populate('user',['name','avatar']); // {user:req.user.id} used to filter one record from profile model(it has user field) with user field value same as the one in request
        //Investigate the populate part

        
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});     
        }

        res.json(profile);
    }
    catch(err){
        console.log("Error in profile.js :"+ err.message);
        return res.status(500).send('Server Error');
    }

})


module.exports=router;