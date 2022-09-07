const jwt = require("jsonwebtoken")
// const blogsModel = require("../model/blogsModel")


const authentication=function(req,res,next){
    try{
        let token=req.headers["x-api-key"];

        if(!token){
            return res.status(401).send({staus:false,messege:"the token must be present"});
        }
        let decodedToken=jwt.verify(token,'functionUp-project1');
        if(!decodedToken){
              res.status(403).send({status:false,messege:"the provided token is invalid"});
        }
        req.loggedInUser = decodedToken.userId
        next();

    }catch(error){
           res.status(500).send({staus:false,messege:error.message})
    }
}

const authourization=function(req,res,next){
    try{
        let blogId=req.params.blogId;
        if(blogId!==req.loggedInUser){
            res.status(403).send({status:false,msg:"you are not authorized"});
        }else
        next();
    }catch(error){
        res.status(500).send({status:false,messege:error.message})
    }
}



module.exports.authentication=authentication
module.exports.authourization=authourization