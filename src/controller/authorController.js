
const authormodel = require("../model/autherModel");

const createAuthor = async function (req, res) {

    try {
        let data = req.body;
       // let {email,password,fname,lname,...rest}=data
        //let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!validEmail.test(req.body.email)) {
            return res.status(400).send({ message: "invild email address" })
        }

        let createbook = await authormodel.create(data)
        res.status(200).send({ data: createbook, status: true })

    } catch (err) {
        res.status(500).send({ msg: err.message })

    }
}


module.exports.createAuthor = createAuthor