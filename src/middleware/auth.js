const jwt = require("jsonwebtoken")



const authentication=function(req,res,next){
    try{
        let token=req.headers["x-api-key"];

        if(!token){
            return res.status(401).send({status:false,message:"the token must be present"});
        }
        let decodedToken=jwt.verify(token,'functionUp-project1');
        if(!decodedToken){
              res.status(403).send({status:false,message:"the provided token is invalid"});
        }
        req.loggedInUser = decodedToken.userId
        next();

    }catch(error){
           res.status(500).send({status:false,message:error.message})
    }
}

const authorization=function(req,res,next){
    try{
        let blogId=req.params.blogId;
        if(blogId!==req.loggedInUser){
            res.status(403).send({status:false,msg:"you are not authorized"});
        }else
        next();
    }catch(error){
        res.status(500).send({status:false,message:error.message})
    }
}



module.exports.authentication=authentication
module.exports.authorization=authorization