const authorModel = require("../model/authorModel");

const createAuthor = async function (req, res) {

    try {
        let data = req.body;
         let {email,password,fname,lname,title}=data
         if(!email){res.status(400).send({msg:"email is required"})}
         if(!password){res.status(400).send({msg:"password is required"})}
         if(!fname){res.status(400).send({msg:"fname is required"})}
         if(!lname){res.status(400).send({msg:"lname is required"})}
         if(!title){res.status(400).send({msg:"title is required"})}

        let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!validEmail.test(req.body.email)) { return res.status(400).send({ message: "invalid email address" }) }
        let validTitle=['Mr','Mrs','Miss']
        if (!validTitle.includes(req.body.title)){return res.status(400).send({message:"invalid title"})}
        let createAuthor = await authorModel.create(data)
        res.status(200).send({ data: createAuthor, status: true })

    } catch (err) {
        res.status(500).send({ msg: err.message })

    }
}


module.exports.createAuthor = createAuthor