const blogsModel = require('../model/blogsModel')
const authorModel = require('../model/authorModel')
const mongoose = require("mongoose");
const moment = require("moment");

const CreateBlog = async function (req, res) {
  try {
    let data = req.body;
    let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");
    let authorId1 = await authorModel.findById(data["authorId"]);
    

    if (!(data.authorId)) {
      return res.status(400).send({ data: " author is not present." });
    }
    if (mongoose.isValidObjectId(authorId1) === false) {
      return res.status(400).send({ Error: "authorId is invalid" });
    }

    if (data["isPublished"] == true) {
      data["publishedAt"] = CurrentDate;
    }
    if (data["isDeleted"] == true) {
      data["deletedAt"] = CurrentDate;
    }


    let savedData = await blogsModel.create(data);
    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const getBlogs = async function(req,res){
  try{
      let queryData = req.query
      let authorId =req.query.authorId
      if(req.query.authorId){
      if(!authorId) return res.status(400).send({status : false, msg : "Please enter a valid author Id"})
      }
      const data = await blogsModel.find({$and : [ { isPublished : true, isDeleted : false, ...queryData}]})
      if(data.length==0) return res.status(404).send({status : false, msg : "No data found"})
      res.status(200).send({status : true, data : data})
  }
  catch(err){
      res.status(500).send({status: false, msg : err.message})
  }
}

const putBlogs = async function (req, res) {
  try {
    let data = req.body
    let id = req.params.blogId

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "please enter blog details for updating" })

    if (!id) return res.status(400).send({ status: false, msg: "blogid is required" }) // check seriously

    let findBlog = await blogsModel.findById(id)

    if (findBlog.isDeleTed == true) res.status(404).send({ msg: "blogs already deleted" })

    let updatedBlog = await blogsModel.findOneAndUpdate({ _id: id }, {
      $set: {
        title: data.title,
        body: data.body,
        category: data.category,
        publishedAt: new Date(),
        isPublished: true
      },
      $push: {
        tags: req.body.tags,
        subcategory: req.body.subcategory
      }
    }, { new: true, upsert: true })
    return res.status(200).send(updatedBlog)
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
};
//delete 
const deleteBlog = async (req,res)=> {
  try{
    const blogId = req.params.blogId
    let dateTime= new Date()
    const checkBlog= await blogsModel.find({_id: blogId, isDeleTed: false})
    if(!checkBlog) return res.status(404).send({status: false, msg: "No Such blog"})
    // if(!checkBlog.blogId) {return res.status(400).send({status : false, msg : "Please enter a valid author Id"})
    //   }
    if(checkBlog.isDeleTed==true) return res.status(400).send({status: false, msg: "No such blog available to delete"})
    const data = await blogsModel.findOneAndUpdate(
      {_id : blogId},
      {$set : { isDeleTed: true, deletedAt: dateTime }},
      {new: true}
    )
    res.status(200).send({status: true, msg:data})
  }
  catch(err){
    res.status(500).send({status: false, msg: err.message})
  }
}

//delete by query params
// const deleteQuery = async (req, res) => {
//   try {
//     let filter = req.query; 
//     filter.isDeleted = false 
//     filter.isPublished = true

//     if(Object.keys(filter).length == 2)  return res.status(400).send({ status: false, message: "Please Enter Query" })
   
//     let data = await blogsModel.find(filter).count();

//     if (!data) return res.status(404).send({ status: false, message: "no such data exists" })

//     let blogsData=await blogsModel.updateMany({filter}, { $set: { isDeleted: true, deletedAt:new Date } }, { new: true })
//     res.send({ status: true,data:blogsData })
// } catch (err) {
//     res.status(500).send({ status: false, mag: err.message });
// }
// };

const deleteQuery=async function(req,res){
  try{
    let data =req.query
    data["isDeleted"]=false
    data["isPublished"]=true
    const newData=await blogsModel.find(data);
    if(newData.length<1){
      res.status(404).send({status:false,message:"not found"});
    }else{
      let newData=await blogsModel.updateMany(data,{$set:{isDeleTed:true}})
      res.status(200).send({status:true,data:newData});
    }
    
  }catch(err){
    res.status(500).send({status: false, msg: err.message})
  }
}
module.exports.CreateBlog = CreateBlog
module.exports.getBlogs = getBlogs
module.exports.putBlogs = putBlogs
module.exports.deleteBlog = deleteBlog
module.exports.deleteQuery = deleteQuery


