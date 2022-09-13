const authorModel = require("../model/authorModel");
const jwt = require("jsonwebtoken");

// -------- create Author ---------------///

const isValid = function(value){
  if (typeof value ==='undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true
}


const createAuthor = async (req, res) => {
  try {
    let data = req.body;
    let { email, password, fname, lname, title } = data;

    if (!isValid(email)) {
      return res.status(400).send({ msg: "email is required" });
    }
    
    //email unique
    const isEmailAlreadyUsed = await authorModel.findOne({ email });
    if (isEmailAlreadyUsed) {
      return res.status(400).send({status: false,message: `email address is already registered`,});
    }
    //--------
    let enumTitle = ['Mr', 'Mrs', 'Miss'];
    if(!enumTitle.includes(title)) return res.status(400).send({ status: false, msg: "Title should be of Mr,or Mrs, or Miss" });
   
    if (!isValid(password)) {
      return res.status(400).send({ msg: "password is required" });
    }
    if (!isValid(fname)) {
      return res.status(400).send({ msg: "fname is required" });
    }
    if (!isValid(lname)) {
      return res.status(400).send({ msg: "lname is required" });
    }
    if (!isValid(title)) {
      return res.status(400).send({ msg: "title is required" });
    }

    let validEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail.test(req.body.email)) {
      return res.status(400).send({ message: "invalid email address" });
    }
    let validTitle = ["Mr", "Mrs", "Miss"];
    if (!validTitle.includes(req.body.title)) {
      return res.status(400).send({ message: "invalid title" });
    }
    let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!validPassword.test(req.body.password)) {
      return res.status(400).send({ message: "invalid password" });
    }

    let createAuthor = await authorModel.create(data);
    res.status(201).send({ data: createAuthor, status: true });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};
//     ---------------    login author   ------------------ ////

const loginAuthor = async (req, res) => {
  try {
    let enterEmail = req.body.email;
    let enterPassword = req.body.password;
    let checkEmailPassword = await authorModel.findOne({
      email: enterEmail,
      password: enterPassword,
    });
    if (!checkEmailPassword) {
      return res
        .status(400)
        .send({ status: false, message: "plz fill valid email and password" });
    }
    // if login successfully
    let uniqueId = checkEmailPassword._id.toString();
    let token = jwt.sign({ ID:uniqueId }, "functionUp-project1");
    res.status(201).send({ status: true, data: {token:token }});
  } catch (err) {
    console.log("Error is: ", err.message);
    res.status(500).send({ status: false, msg: "Error", Error: err.message });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;
