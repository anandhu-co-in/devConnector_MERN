const express = require('express');
const router = express.Router();
const tokenValidator=require("../../middlewear/validatetoken");
const userModel=require("../../models/user");
const profileModel=require("../../models/profile");

const {check,validationResult} = require("express-validator");
const axios=require('axios');
const config=require('config');


//@route GET api/profile/me
//@desc  Get current users profile
//@access Private


router.get("/me",tokenValidator,async (req,res)=>{
    //Here because the token is valid
    try{

        //Get the user profile matching the id

        const profile= await profileModel.findOne({user:req.user.id}).populate('user',['name','avatar']); // {user:req.user.id} used to filter one record from profile model(it has user field) with user field value same as the one in request
                                                                    //Investigate the populate part --> user filed is a lookup, from the target take name and avatart and populate in user
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
                return res.json(profile); 
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


//@route GET api/profile
//@desc  Get All profiles
//@access Public


router.get('/',async (req,res)=>{
    try{
        const profiles=await profileModel.find().populate('user',['name','avatar']);
        res.json(profiles);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


//@route GET api/profile/user/:user_id
//@desc  Get All profiles
//@access Public


router.get('/user/:user_id',async (req,res)=>{
    try{
        console.log(req.params.user_id)
        const profiles=await profileModel.findOne({user:req.params.user_id}).populate('user',['name','avatar']);

        if(!profiles){
            return res.status(400).json({msg:'There is no profile for this user'});     
        }
        
        console.log(profiles)
        res.json(profiles);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});



//@route DELETE 
//@desc  Delete profile
//@access Private

router.delete('/',tokenValidator,async (req,res)=>{
    try{
        //Remove profile

        console.log(req.user.id)
        await profileModel.findOneAndRemove({user:req.user.id});

        await userModel.findOneAndRemove({_id:req.user.id});

        res.json({msg:"User deleted"});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});



//@route PUT api/profile/experience 
//@desc  Add profile experience
//@access Private

mw=[
    tokenValidator,
    check('title','Title is requried').not().notEmpty(),
    check('company','Company is requried').not().notEmpty(),
    check('from','From date is requried').not().notEmpty(),
] 


router.put("/experience",mw,async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {title,company,location,from,to,current,description} = req.body;
    const newExp={title,company,location,from,to,current,description};

    try {
        const profile = await profileModel.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save()
        res.json(profile);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }


});



//@route DELETE api/profile/experience 
//@desc  Delete profile experience
//@access Private

mw=[
    tokenValidator
] 

router.delete("/experience/:ex_id",mw,async (req,res)=>{

    try {
        //Find the profile
        const profile=await profileModel.findOne({user:req.user.id});

        //Inside the profile, inside its experience array, find the location of the exp id in the request
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.ex_id);

        if(removeIndex<0)
            return res.status(500).send({msg:'Failed to remove experience'});
        
        
        //Remove one array element from that index, it it will delete that experience
        profile.experience.splice(removeIndex,1)

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }


});


///////////////////



//@route PUT api/profile/education 
//@desc  Add profile education
//@access Private

mw=[
    tokenValidator,
    check('school','School is requried').not().notEmpty(),
    check('degree','Degree is requried').not().notEmpty(),
    check('fieldofstudy','Field of study is requried').not().notEmpty(),
    check('from','From date is requried').not().notEmpty(),
] 

router.put("/education",mw,async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {school,degree,fieldofstudy,from,to,current,description} = req.body;
    const newEdu={school,degree,fieldofstudy,from,to,current,description};

    try {
        const profile = await profileModel.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save()
        res.json(profile);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }


});



//@route DELETE api/profile/education 
//@desc  Delete profile education
//@access Private

mw=[
    tokenValidator
] 

router.delete("/education/:ed_id",mw,async (req,res)=>{

    try {
        //Find the profile
        const profile=await profileModel.findOne({user:req.user.id});

        //Inside the profile, inside its education array, find the location of the exp id in the request
        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.ed_id);

        if(removeIndex<0)
            return res.status(500).send({msg:'Failed to remove Education'});
        
        
        //Remove one array element from that index, it it will delete that education
        profile.education.splice(removeIndex,1)

        await profile.save();

        res.json(profile);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error');
    }


});




//@route GET api/profile/github/:username
//@desc  Get repos from a github user
//@access Public


router.get('/github/:username',async (req,res)=>{
    try{

        // const options={
        //     uri:encodeURI(`https://api.github.com/user/${req.params.username}/repos?per_page=5&sort=created:asc`),
        //     method:'GET',
        //     headers:{
        //         'user-agent' : 'node.js',
        //         Authorization: `token 4a07c4ef27a94db0ad0e6f0f75c7a1608c41d566`
        //     }
        // }

        //above code was deprecated, so i got the updated code from brads repo, https://github.com/bradtraversy/devconnector_2.0#changes-to-github-api-authentication
        //as per the link, request is also deprecated, so used axios :

        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
          );
          const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubtoken')}`
          };
          

        const gitHubResponse = await axios.get(uri, { headers });
        res.json(gitHubResponse.data);//Seems like gitHubResponse.data is already in json, i tried to parse json from it, which gave error

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

















module.exports=router;