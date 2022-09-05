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