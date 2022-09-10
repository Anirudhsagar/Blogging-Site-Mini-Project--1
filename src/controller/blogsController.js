const blogsModel = require('../model/blogsModel')
const authorModel = require('../model/authorModel')
const mongoose = require("mongoose");
const moment = require("moment");


// ------------ createBlog --------------//

const CreateBlog = async (req, res) => {
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

// ------------- getBlogs ------------------//

const getBlogs = async (req, res) => {
  try {
    const filter={isDeleTed:false,isPublished:true}
    const{category,tags,subcategory,authorId}=req.query
    if(Object.keys(req.query).length==0) {
      res.status(400).send({status:false,msg:"please provide data"});
    }
    if(authorId){
      if(!mongoose.Types.ObjectId.isValid(authorId)){
        res.status(400).send({status:false,msg:"invalid author id"});
      }
    }
    const blog=await blogsModel.find(filter) 
    return res.status(200).send({status:false,data:blog})
    // let queryData = req.query
    // queryData['isPublished'] = true;
    // queryData['isDeleTed'] = false;



    //let authorId = req.query.authorId
    // if(queryData.authorId){
    //   if(!mongoose.Types.ObjectId.isValid(queryData.authorId)) res.status(400).send({status:false,msg:"This is invalid Id"})
    // }else{
    //   const data = await blogsModel.find(queryData)
    //   return res.status(200).send({ status: true, data: data })
    // console.log(data)
    // if (!data.authorId) return res.status(404).send({ status: false, msg: "authorId not found" });
    //  //if (!authorId) return res.status(400).send({ status: false, msg: "Please enter a Author Id" })

    // if (data.length < 1) return res.status(404).send({ status: false, msg: "No data found with this author condition" })

           
    // }

   
  }
  catch (err) {
   return res.status(500).send({ status: false, msg: err.message })
  }
}


// ------------ putBlogs --------------------//

// const putBlogs = async  (req, res)=> {
//   try {
//     let data = req.body
//     let id = req.params.blogId
//     // console.log(id)

//     if (id==(":blogId")) return res.status(400).send({ status: false, msg: "blogId is required" }) // check seriously
//     if (data.length<1) return res.status(400).send({ status: false, msg: "please enter blog details for updating" })
//     let findBlog = await blogsModel.findById(id)
//     if(!findBlog) return res.send({status:401,msg:"Provided blogId is not valid"})

//     if (findBlog.isDeleTed == true) res.status(404).send({ msg: "blogs already deleted" })

//     let updatedBlog = await blogsModel.findOneAndUpdate({ _id: id }, {
//       $set: {
//         title: data.title,
//         body: data.body,
//         category: data.category,
//         publishedAt: new Date(),
//         isPublished: true
//       },
//       $push: {
//         tags: req.body.tags,
//         subcategory: req.body.subcategory
//       }
//     }, { new: true, upsert: true })
//     return res.status(200).send(updatedBlog)
//   }
//   catch (err) {
//     res.status(500).send({ status: false, msg: err.message })
//   }
// };
const putBlogs = async function (req, res) {

  try {

    let blogId = req.params.blogId;
    if(!blogId) return res.status(400).send({status:false,msg:"blogId is required"})
    if(!mongoose.Types.ObjectId.isValid(blogId)) res.status(400).send({status:false,msg:"This is blog Id"})
    let blog = await blogsModel.findById(blogId);
    if (!blog) return res.status(404).send({ msg: "Blog Doesn't Exist" })
    let data = req.body;

    let updatedBlog = await blogsModel.findOneAndUpdate(
      { _id: blogId, isDeleTed: false },//it will check blog is available or not


      {
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
      }, { new: true, upsert: true });


    res.status(200).send({ status: true, msg: updatedBlog })

  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: err.message })
  }
}

// ---------------------- deleteBlog -------------------------- //

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId
    let dateTime = new Date()
    const checkBlog = await blogsModel.find({ _id: blogId, isDeleTed: false })
    if (!checkBlog) return res.status(404).send({ status: false, msg: "No Such blog" })

    if (checkBlog.isDeleTed == true) return res.status(400).send({ status: false, msg: "No such blog available to delete" })
    const data = await blogsModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleTed: true, deletedAt: dateTime } },
      { new: true }
    )
    res.status(200).send({ status: true, msg: data })
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}


// ---------------- deleteQuery ------------------// 
const deleteQuery = async (req, res) => {
  try {
    let data = req.query
    data["isDeleTed"] = false
    data["isPublished"] = true
    const newData = await blogsModel.find(data);
    if (newData.length < 1) {
      res.status(404).send({ status: false, message: "not found" });
    } else {
      let newData = await blogsModel.updateMany(data, { $set: { isDeleTed: true } })
      res.status(200).send({ status: true, data: newData });
    }

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}



module.exports.CreateBlog = CreateBlog
module.exports.getBlogs = getBlogs
module.exports.putBlogs = putBlogs
module.exports.deleteBlog = deleteBlog
module.exports.deleteQuery = deleteQuery


