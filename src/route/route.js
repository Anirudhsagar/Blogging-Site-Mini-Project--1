const express = require('express');
const router = express.Router();
const authorController= require("../controller/authorController")
const blogsController= require("../controller/blogsController")



router.post("/author", authorController.createAuthor  )

router.post("/blogs",blogsController.CreateBlog)
router.get("/getBlogs",blogsController.getBlogs)
router.put("/blogs/:blogId",blogsController.putBlogs)





module.exports = router;