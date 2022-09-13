const express = require("express");

const router = express.Router();

const authorController = require("../controller/authorController");

const blogsController = require("../controller/blogsController");

const middleware = require("../middleware/auth");

router.post("/authors", authorController.createAuthor); // 1 st api

router.post("/blogs", blogsController.CreateBlog); // 2nd api hit

//,middleware.authentication

router.get("/blogs", middleware.authentication, blogsController.getBlogs); // 3rd api

router.put(
  "/blogs/:blogId",
  middleware.authentication,
  middleware.authorization,
  blogsController.putBlogs
); // 4th api
//,middleware.authentication,middleware.authorization

router.delete(
  "/blogs/:blogId",
  middleware.authentication,
  middleware.authorization,
  blogsController.deleteBlog
); //5 th api
//,middleware.authentication,middleware.authorization

router.delete("/blogs", middleware.authentication,blogsController.deleteQuery); //6th api
//middleware.authentication,

router.post("/login", authorController.loginAuthor); //7th api

module.exports = router;
