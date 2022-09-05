const express = require('express');
const router = express.Router();
const userController= require("../controllers/authorController")
const blogsController= require("../controllers/blogsController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/autherName","userController.autherLogin")
router.post("/blogs","blogsController.blogs")


module.exports = router;