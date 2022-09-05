const express = require('express');
const router = express.Router();
const authorController= require("../controller/authorController")



router.post("/author", authorController.createAuthor  )






module.exports = router;