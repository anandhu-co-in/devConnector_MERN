const express = require('express');
const router = express.Router();

const tokenValidator=require("../../middlewear/validatetoken");
const {check,validationResult} = require("express-validator");


const userModel=require("../../models/user");
const profileModel=require("../../models/profile");
const postsModel=require("../../models/posts");




//@route POST api/post
//@desc  Create new post
//@access Private

mw=[
    tokenValidator,
    check('text','Text is requried').not().notEmpty()
] 

router.post("/",mw,async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    console.log("Validation Passed")

    try {

        const user= await userModel.findById(req.user.id).select('-password');

        const newPost=new postsModel({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        });
    
        await newPost.save();
        
        res.send(newPost);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

})


//@route GET api/post
//@desc  Get all posts
//@access Private

router.get("/",tokenValidator,async (req,res)=>{

    try {

        //get all posts sorted by date field(-1 for most recent first)
        const posts= await postsModel.find().sort({date:-1});        
        res.send(posts);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

})



//@route GET api/post
//@desc  Get post by id
//@access Private

router.get("/:id",tokenValidator, async (req,res)=>{

    try {

        //get all posts sorted by date field(-1 for most recent first)
        const post= await postsModel.findById(req.params.id)   
       
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }
        res.send(post);
    } catch (err) {
        console.error(err.message);
        
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }

        res.status(500).send('Server Error');
    }

})



//@route DELETE api/post
//@desc  Deletepost by id
//@access Private

router.delete("/:id",tokenValidator, async (req,res)=>{

    try {

        const post= await postsModel.findById(req.params.id)   
        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }

        if(post.user.toString()!==req.user.id){
            return res.status(401).json({msg:'User not authorized'});
        }

        await post.remove();

        res.json({msg:'Post removed'});
    } catch (err) {
        console.error(err.message);
        
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }

        res.status(500).send('Server Error');
    }

})


//@route PUT api/post/like:id
//@desc  Like post with id
//@access Private

 
router.put('/like/:id',tokenValidator,async(req,res)=>{


    try{

        //Find the post using id
        const post= await postsModel.findById(req.params.id);

        //if current user has already liked the post

        const currentLikes=post.likes.filter(like=>like.user.toString()===req.user.id).length;

        if(currentLikes>0){
            return res.status(400).json({msg:"Post already liked"});
        }

        //add like to that post
        post.likes.unshift({user:req.user.id})

        await post.save();

        res.json(post.likes);
        
    }
    catch(err){

        console.error(err);

        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }

        res.status(500).send('Server Error');

    }


});


//@route PUT api/post/unlike/:id
//@desc  Unlike post with id
//@access Private

 
router.put('/unlike/:id',tokenValidator,async(req,res)=>{


    try{

        //Find the post using id
        const post= await postsModel.findById(req.params.id);

        //if current user has already liked the post

        const currentLikes=post.likes.filter(like=>like.user.toString()===req.user.id).length;

        if(currentLikes===0){
            return res.status(400).json({msg:"Post not liked"});
        }

        //Get remove index of like

        const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);


        post.likes.splice(removeIndex,1);

        //Remove the like


        await post.save();
        res.json(post.likes);
        
    }
    catch(err){

        console.error(err);

        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }

        res.status(500).send('Server Error');

    }


});



//@route PUT api/post/like:id
//@desc  Add comment to post with id
//@access Private


mw=[
    tokenValidator,
    check('text','Text is requried').not().notEmpty()
] 
 
router.put('/comment/:id',mw,async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }    

    try {
    
        const user= await userModel.findById(req.user.id).select('-password');
        const post= await postsModel.findById(req.params.id)
    
        const newComment={
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        };
        
        post.comments.unshift(newComment);
        await post.save();
        res.send(post);    
    }
    catch(err){

        console.error(err);

        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }

        res.status(500).send('Server Error');

    }


});



//@route DELETE api/post/comment/:id
//@desc  Remove comment with its id
//@access Private

 
router.delete('/comment/:id/:comment_id',tokenValidator,async(req,res)=>{

    try{

        //Find the post using id
        const post= await postsModel.findById(req.params.id);

        if(!post){
            return res.status(401).json({msg:"Post doesn't exist"});
        }

        //Find the comment frin the comment array
        const comment=post.comments.find(comment=>comment.id===req.params.comment_id);
        
        if(!comment){
            return res.status(401).json({msg:"Comment not present"});
        }
        
        //If comment is not of current user, shouldnt delete
        if(comment.user.toString()!==req.user.id){
            return res.status(400).json({msg:"No authorized to delete comment"});
        }

        //Find the index of the comment in the array
        const removeIndex=post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);

        //Remove comment and save
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post);
        
    }
    catch(err){

        console.error(err);

        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'Post doesnt exists'});
        }

        res.status(500).send('Server Error');

    }


});

module.exports=router;


//Future updates

//1)Edit comments
//2)Like comments