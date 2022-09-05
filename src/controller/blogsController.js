const blogsModel=require('../model/blogsModel')

const blogs=async function (req,res){
   try{ 
    let blogs=req.body
    if(!blogs.authorId){
        res.send({Status:false,msg:"autherId should be available"})
    }
    if(blogs.length==0){
        res.send({Status:false,msg:"this field cannot be blanked"})
    }
    let createBlogs= await blogsModel.creat(blogs).populate(authorId);
    res.send({status:true,mag:createBlogs})  
}catch(error){
    res.status(400).send({status:false,error:error.message})
}
}

module.exports.blogs=blogs