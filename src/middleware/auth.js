const jwt = require("jsonwebtoken");
const { send } = require("process");
const blogsModel = require("../model/blogsModel");
const mongoose=require('mongoose');



const authentication=function(req,res,next){
    try{
        let token=req.headers["x-api-key"];
// console.log(token)
        if(!token){
            return res.status(400).send({status:false,message:"the token must be present"});
        }
        else{
            const validToken=jwt.decode(token)
            if(validToken){
                jwt.verify(token,'functionUp-project1')
                next();
            }else{
                res.status(401).send({status:false,msg:"invalid token"})
            }
        }
        // let decodedToken=;
        // if(!decodedToken){
        //      return res.status(403).send({status:false,message:"the provided token is invalid"});
        // }
        // loggedInUser = decodedToken.ID
        // console.log(req.loggedInUser)
        // next();

    }catch(error){
        res.status(500).send({status:false,message:error.message})
 }
}

const authorization=async function(req,res,next){
    try{
   const blogsId=req.params.blogId;
   if(!mongoose.Types.ObjectId.isValid(blogsId))
   return res.status(400).send({status:false,msg:"provide blogId"}) 
    let data=await blogsModel.findById(blogsId)
    if(!data) return res.status(400).send({status:false,msg:"provide valid blogId"})
    const token =req.headers["x-api-key"]
    const decodedToken =jwt.verify(token,'functionUp-project1')
    console.log(data.authorId)
    console.log()
    if(data.authorId==decodedToken.ID)
    {
        next()
    }else{
        res.status(403).send({status:false,msg:"authorization failed"})
    }
// let b=data.authorId

// // console.log(b)
//    if (b !=  loggedInUser){
//     return res. status(401).send({status:false, msg: "permission denied"}) 
//    }
//    next()
}catch(error){
    res.status(500).send({status:false,message:error.message})
}
}


module.exports.authentication= authentication
module.exports.authorization=authorization
