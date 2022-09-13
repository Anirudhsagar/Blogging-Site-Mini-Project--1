const blogsModel = require("../model/blogsModel");

const authorModel = require("../model/authorModel");

const mongoose = require("mongoose");

const moment = require("moment");

// ------------ createBlog --------------//

const CreateBlog = async (req, res) => {
  try {
    let data = req.body;
    let { title, body, authorId, tags, subcategory, category,isPublished,isDeleted } = data;

    if (!title) {
      return res.status(400).send({ msg: "title is required" });
    }
    if (!body) {
      return res.status(400).send({ msg: "body is required" });
    }
    if (!authorId) {
      return res.status(400).send({ msg: "authorId is required" });
    }
    if (!tags) {
      return res.status(400).send({ msg: "tags is required" });
    }
    if (!subcategory) {
      return res.status(400).send({ msg: "subcategory is required" });
    }
    if (!category) {
      return res.status(400).send({ msg: "category is required" });
    }

    
    let authorId1 = await authorModel.findById(data["authorId"]);

    if (!data.authorId) {
      return res.status(400).send({ data: " author is not present." });
    }
    if (mongoose.isValidObjectId(authorId1) === false) {
      return res.status(400).send({ Error: "authorId is invalid" });
    }


    if (isPublished) {
      let timeStamps = new Date();
      data.publishedAt = timeStamps;
    }

    if(isDeleted){
      let timeStamps = new Date();
    data.deletedAt = timeStamps;
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
    let queryData = req.query;
    queryData["isPublished"] = false;
    queryData["isDeleted"] = false;

    let authorId = req.query.authorId;

    if (authorId == "")
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a Author Id" });

    if (authorId && !mongoose.isValidObjectId(authorId))
      return res
        .status(400)
        .send({ status: false, msg: "please enter valid authorID" });

    const data = await blogsModel.find(queryData);

    if (data.length == 0)
      return res.status(404).send({ status: false, msg: "No data found" });
    return res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ------------ putBlogs --------------------//

const putBlogs = async (req, res) => {
  try {
    let blogId = req.params.blogId;
    if (!blogId)
      return res.status(400).send({ status: false, msg: "blogId is required" });
    if (!mongoose.Types.ObjectId.isValid(blogId))
      res.status(400).send({ status: false, msg: "invalid blog id" });
    let blog = await blogsModel.findById(blogId);
    if (!blog) return res.status(404).send({ msg: "Blog Doesn't Exist" });
    let data = req.body;

    let updatedBlog = await blogsModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false }, //it will check blog is available or not

      {
        $set: {
          title: data.title,
          body: data.body,
          category: data.category,
          
          isPublished: true,
        },
        $push: {
          tags: req.body.tags,
          subcategory: req.body.subcategory,
        },
      },
      { new: true }
    );

    res.status(200).send({ status:true, data:updatedBlog ,message:"Update Successfully"});
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ---------------------- deleteBlog -------------------------- //

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    let dateTime = new Date();
    const checkBlog = await blogsModel.find({ _id: blogId, isDeleted: false });
    if (!checkBlog)
      return res.status(404).send({ status: false, msg: "No Such blog" });

    if (checkBlog.isDeleted == true)
      return res
        .status(400)
        .send({ status: false, msg: "No such blog available to delete" });
    const data = await blogsModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: dateTime } },
      { new: true }
    );
    res.status(200).send({ status: true, msg: data });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// ---------------- deleteQuery ------------------//
const deleteQuery = async (req, res) => {
  try {
    let data = req.query;
    data["isDeleted"] = false;
    data["isPublished"] = true;
    const newData = await blogsModel.find(data);
    if (newData.length < 1) {
      return res.status(404).send({ status: false, message: "not found" });
    } else {
      let newData = await blogsModel.updateMany(
        data,
        { $set: { isDeleted: true } },
        { new: true }
      );
      return res.status(200).send({ status: true, data: newData });
    }
  } catch (err) {
   return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.CreateBlog = CreateBlog;
module.exports.getBlogs = getBlogs;
module.exports.putBlogs = putBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteQuery = deleteQuery;
