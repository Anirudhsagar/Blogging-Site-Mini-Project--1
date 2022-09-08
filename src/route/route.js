const express = require('express');
const router = express.Router();
const authorController= require("../controller/authorController")
const blogsController= require("../controller/blogsController")
const middleware=require("../middleware/auth")



router.post("/author", authorController.createAuthor  )  

router.post("/loginAuthor",authorController.loginAuthor)

router.post("/blogs",middleware.authentication,blogsController.CreateBlog) 
      //,middleware.authentication

router.get("/getBlogs",blogsController.getBlogs)

router.put("/blogs/:blogId",middleware.authentication,middleware.authorization,blogsController.putBlogs)
   //,middleware.authentication,middleware.authorization

   
router.delete("/blogs/:blogId",middleware.authentication,middleware.authorization,blogsController.deleteBlog) 
   //,middleware.authentication,middleware.authorization


router.delete("/blogs",middleware.authentication,blogsController.deleteQuery)
      //middleware.authentication,





module.exports = router;