<<<<<<< HEAD


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
=======
const authormodel=require('..model/autherModel');

const createAuthor=async function(req,res){
    
    try {
        let book=req.body;
        let createbook=await authormodel.create(book)
        res.status(200).send({data:createbook,status:True})

    } catch (err) {
        res.status(500).send({msg:err.message})
        
    }
}


module.exports.createAuthor=createAuthor
>>>>>>> d8b2480a6de6bea1c25eb6a9654b2a1e93192292
