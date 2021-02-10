const express = require('express');
const router = express.Router();
const tokenValidator=require("../../middlewear/validatetoken");
const userModel=require("../../models/user");
const profileModel=require("../../models/profile");

const {check,validationResult} = require('express-validator/check');



//@route GET api/profile/me
//@desc  Get current users profile
//@access Private

router.get("/me",tokenValidator,async (req,res)=>{
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



//@route POST api/profile
//@desc  Add user profile
//@access Private


mw=[tokenValidator,[check('status','Status is requried').not().notEmpty()],[check('skills','skills is requried').not().notEmpty()]] //Investage wherether nee to separate the checks using inner square brackets

router.post("/",mw,async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{company,website,location,bio,status,githubusername,skills,youtube,facebook,twitter,instagram,linkedin}=req.body;

    const profileFields={};
    profileFields.user=req.user.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusername) profileFields.githubusername=githubusername;

    if(skills){
        profileFields.skills=skills.split(',').map(skill=>skill.trim());
    }

    console.log(profileFields)

    profileFields.social={};

    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(facebook) profileFields.social.facebook=facebook;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(instagram) profileFields.social.instagram=instagram;

    try{

        let profile=await profileModel.findOne({user:req.user.id});

        
        //If profile already exists, then just update it
        if(profile){
            profile=await profileModel.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true} //new true to return new document after update 
                );
                return res.json(profileFields); 
        }

        //We are here is profile not already existing, then just add it to db

        profile=new profileModel(profileFields);
        await profile.save();
        return res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})










module.exports=router;