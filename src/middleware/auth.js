 
  const jwt = require("jsonwebtoken");
  const blogsModel = require("../model/blogsModel");
  const mongoose=require('mongoose');
  
  const authentication=(req,res,next)=>{
      try{
          let token=req.headers["x-api-key"];
  
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
          
  
      }catch(error){
          res.status(500).send({status:false,message:error.message})
   }
  }
  
  const authorization=async (req,res,next)=> {
      try{
     const blogsId=req.params.blogId;
     if(!mongoose.Types.ObjectId.isValid(blogsId))
     return res.status(400).send({status:false,msg:"message form middleware that valid blog id is not provided"}) 
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

  }catch(error){
      res.status(500).send({status:false,message:error.message})
  }
  }
  
  
  module.exports.authentication= authentication
  module.exports.authorization=authorization