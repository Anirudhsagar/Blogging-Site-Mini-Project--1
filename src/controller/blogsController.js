const blogsModel=require('../model/blogsModel')
const authorModel=require('../model/authorModel')

// // const createBlog = async (req,res)=>{
// //     try{
// //         let data= req.body
// //         let author_id= data.authorId
// //         console.log(author_id)
// //         let authorData= await authorModel.findById(author_id)

// //         if(!authorData){
// //             res.status(400).send({ msg:"Invalid AuthorId"})
// //         }
// //         else {
// //             let authorCreated = await blogsModel.create(data)
// //             res.status(201).send({ msg: authorCreated})
// //         }
// //     }
// //     catch(err){
// //         req.status(500).send(err.message)
// //     }
// // }

// const blogsModel=require('../model/blogsModel')
// const authorModel=require('../model/authorModel')

// const isValid = function (value) {
//     if (typeof value === "undefined" || value === Number || value === null) return false
//     if (typeof value === "string" && value.trim().length === 0) return false
//     return true
// }


// let createBlogs = async function (req, res) {
//     try {
//         let blogBody = req.body;
//         if (Object.keys(blogBody).length == 0) {
//             return res.status(400).send({ status: false, msg: "data is required" });
//         }
//         if (!isValid(blogBody.title)) {
//             return res.status(400).send({ status: false, msg: "title is required" });
//         }

//         if (!isValid(blogBody.body)) {
//             return res.status(400).send({ status: false, msg: "body is required" });
//         }

//         if (!isValid(blogBody.authorId)) {
//             return res.status(400).send({ status: false, msg: "authorId is required" });
//         }

//         if (!isValid(blogBody.tags)) {
//             return res.status(400).send({ status: false, msg: "tags is required" });
//         }

//         if (!isValid(blogBody.category)) {
//             return res.status(400).send({ status: false, msg: "category is required" });
//         }

//         if (!isValid(blogBody.subcategory)) {
//             return res.status(400).send({ status: false, msg: "subcategory is required" });
//         }

//         if (!isValid(blogBody.publishedAt)) {
//             return res.status(400).send({ status: false, msg: "publishedAt is required" });
//         }

//         if (!isValid(blogBody.deletedAt)) {
//             return res.status(400).send({ status: false, msg: "deletedAt is required" });
//         }

//         let checkAuthorId = await authorModel.findById(req.body.authorId);
//         if (!checkAuthorId) {
//             return res.status(400).send({ msg: "Please Enter Valid AuthorId" });
//         } else {
//             let blogData = await blogsModel.create(blogBody);
//             res.status(201).send({ data: blogData });
//         }
//     } catch (err) {
//         res.status(500).send({ ErrorName: err.name, ErrorMsg: err.message });
//     }
// };

// module.exports.createBlogs=createBlogs


// const authorModel = require("../Models/authorModel");
// const blogModel = require("../model/blogsModel");
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

const getBlogs = async function (req, res) {
  try {
    let filter = req.query
    let authorId = await blogsModel.find(filter);
    for (let i = 0; i < authorId.length; i++) {
    //   if (authorId[i]["isDeleted"] !== false && authorId[i]["isPublished"] !== true ) {
    //     return res.status(400).send({ status:false, error: "isDeleted or isPublished is not valid"});
    //   }
      return res.status(200).send({status: true, data: authorId})
    }
  } catch (error) {
    res.status(500).send({ status:false, error: error.message});
  }
};

module.exports.CreateBlog = CreateBlog
module.exports.getBlogs = getBlogs

