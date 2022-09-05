

const authorModel=require('../model/autherModel')

const autherName=async function (req,res){
   try{ 
    let author=req.body
    if(author.length==0){
        res.status(201).send({Status:false,msg:"you cannot enter the empty body"})
    }
    let createAuthor= await authorModel.creat(author);
    res.send({status:true,mag:createAuthor})  
}catch(error){
    res.status(400).send({status:false,error:error.message})
}
}

module.exports.autherName=autherName