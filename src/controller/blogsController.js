const blogsModel=require('../model/blogsModel')
const authorModel=require('../model/authorModel')

const blogs=async function (req,res){
   try{ 
    let blogs=req.body
    if(blogs.length==0){
        res.send({Status:false,msg:"this field cannot be blanked"})
    }
    if(!blogs.authorId){
        res.send({Status:false,msg:"authorId should be available"})
    }
    //  let authorId = await authorModel.findById(blogs.author)
    // if(!authorId) {
    //     return res.send({status: false, msg: "Author id is not valid"})
    // }
    
    let createBlogs= await blogsModel.create(blogs).populate(authorId);
    res.status(201).send({status:true,mag:createBlogs})  
}catch(error){
    res.status(400).send({status:false,error:error.message})
}
}

module.exports.blogs=blogs
