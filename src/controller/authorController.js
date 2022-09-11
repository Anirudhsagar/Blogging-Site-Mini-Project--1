const authorModel = require("../model/authorModel");
const jwt = require('jsonwebtoken')



// -------- create Author ---------------/// 
const createAuthor = async (req, res)=> {

    try {
        let data = req.body;
        let { email, password, fname, lname, title } = data
        
        //email unique 
        const isEmailAlreadyUsed = await authorModel.findOne({ email }); 
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `email address is already registered` })
        }
        //--------
        if (!email) { return res.status(400).send({ msg: "email is required" }) }
        else if (!password) {return res.status(400).send({ msg: "password is required" }) }
        else if (!fname) {return  res.status(400).send({ msg: "fname is required" }) }
        else if (!lname) {return res.status(400).send({ msg: "lname is required" }) }
        else if (!title) {return  res.status(400).send({ msg: "title is required" }) }

        let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!validEmail.test(req.body.email)) { return res.status(400).send({ message: "invalid email address" }) }
        let validTitle = ['Mr', 'Mrs', 'Miss']
        if (!validTitle.includes(req.body.title)) { return res.status(400).send({ message: "invalid title" }) }
        let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        if (!validPassword.test(req.body.password)) { return res.status(400).send({ message: "invalid password" }) }



        let createAuthor = await authorModel.create(data)
        res.status(200).send({ data: createAuthor, status: true })

    } catch (err) {
        res.status(500).send({ msg: err.message })

    }
}
   //     ---------------    login author   ------------------ ////


const loginAuthor = async (req,res)=>{
    try{
    let enterEmail = req.body.email
    let enterPassword = req.body.password
    let checkEmailPassword = await authorModel.findOne({email:enterEmail,password:enterPassword})
    if(!checkEmailPassword){
        return res.status(400).send({status:false,msg:"plz fill valid email and password"})
    }
    // if login successfully
    let uniqueId =checkEmailPassword._id.toString()
    let token = jwt.sign({ID:uniqueId} ,'functionUp-project1')
    res.status(201).send({status:true,msg:token})
}
catch (err) {
    console.log("Error is: ", err.message)
    res.status(500).send({ status: false, msg: "Error", Error: err.message })
  }

}

module.exports.createAuthor = createAuthor
module.exports.loginAuthor=loginAuthor 