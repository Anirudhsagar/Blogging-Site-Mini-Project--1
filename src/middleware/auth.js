const jwt = require("jsonwebtoken");
const blogsModel = require("../model/blogsModel");



const authentication=function(req,res,next){
    try{
        let token=req.headers["x-api-key"];
// console.log(token)
        if(!token){
            return res.status(401).send({status:false,message:"the token must be present"});
        }
        let decodedToken=jwt.verify(token,'functionUp-project1');
        if(!decodedToken){
              res.status(403).send({status:false,message:"the provided token is invalid"});
        }
        req.loggedInUser = decodedToken.ID
        console.log(req.loggedInUser)
        next();

    }catch(error){
        res.status(500).send({status:false,message:error.message})
 }
}

const authorization=async function(req,res,next){
    try{
   let newId = req.query.authorId
   const blogsId=req.params.blogId;
//    console.log(newId)
   if(!newId) return res.send({status:false,msg:"authorId must be present in order to proceed further"})
   
    let a=await blogsModel.findByIdAndUpdate(blogsId)
let b=a.authorId;

// console.log(b)
   if (b !=  req.loggedInUser){
    return res. status(401).send({status:false, msg: "permission denied"}) 
   }
   next()
}catch(error){
    res.status(500).send({status:false,message:error.message})
}
}

module.exports.authentication= authentication
module.exports.authorization=authorization