const blogsModel=require('../model/blogsModel')
const authorModel=require('../model/authorModel')
const mongoose = require("mongoose");
const moment = require("moment");

const CreateBlog = async function (req, res) {
  try {
    let data = req.body;
    let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");
    let authorId = await authorModel.findById(data["authorId"]);
    let idAuthorId = authorId._id;

    if (!authorId) {
      return res.status(400).send({ data: " author is not present." });
    }
    if (mongoose.isValidObjectId(idAuthorId) === false) {
      return res.status(400).send({ Error: "authorId is invalid" });
    }

    if (data["isPublished"] == true) {
      data["publishedAt"] = CurrentDate;
    }
    if (data["isDeleted"] == true) {
      data["deletedAt"] = CurrentDate;
    }


    let savedData = await blogsModel.create(data);
    res.status(201).send({status:true, data: savedData });
  } catch (error) {
    res.status(500).send({ status:false, error: error.message});
  }
};




// const getBlogs = async (req, res) => {
//   try {
//     let combination = req.query;
//     let dataBlog = await blogsModel.find({
//       $and: [{ isDeleted: false, isPublished: true }, combination],
//     });
//     if (dataBlog == 0) {
//       return res.status(404).send({ error: " DATA NOT FOUND " });
//     } else return res.status(201).send({ data: dataBlog });
//   } catch (err) {
//     res.status(500).send({ status: false, error: err.message });
//   }
// };




// const getBlogs = async function (req, res) {
//   try {
//     let filter = req.query
//     let authorId = await blogsModel.find(filter);
//     for (let i = 0; i < authorId.length; i++) {
//     //   if (authorId[i]["isDeleted"] !== false && authorId[i]["isPublished"] !== true ) {
//     //     return res.status(400).send({ status:false, error: "isDeleted or isPublished is not valid"});
//     //   }
//       return res.status(200).send({status: true, data: authorId})
//     }
//   } catch (error) {
//     res.status(500).send({ status:false, error: error.message});
//   }
// };


const getBlogs=async function(req,res){
  try{
    let data=req.query
    let filter={isDeleted:false,ispublished:true,...data}
    let blogs=await blogsModel.find(filter)
    if (blogs.length===0){
      res.status(404).send({msg:"No blogs is present"})
    }else{res.status(200).send({status:true,data:blogs })}
  }
  catch (err){
    res.status(500).send({status:false,msg:err.message})
  }
}

const putBlogs = async function (req, res) {
  try {
    let data = req.body
    let id = req.params.blogId

    if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "please enter blog details for updating" })

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







module.exports.CreateBlog = CreateBlog
module.exports.getBlogs = getBlogs 
module.exports.putBlogs = putBlogs 

