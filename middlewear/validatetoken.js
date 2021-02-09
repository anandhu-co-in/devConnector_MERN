const jwt=require('jsonwebtoken');
const config=require('config');

//Middlewar function to validate the token 
function validator(req,res,next){

    //get the token from request
    const token=req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});
    }

     
    //Verify token, if verification fails, will go to catch block
    try{
        const decoded=jwt.verify(token, config.get('jwtSecret'));
        req.user=decoded.user;
        next();
    }
    catch(err){
        console.log(err.message);
        return res.status(401).json({msg:'Token is not valid'});
    }
}


module.exports=validator;