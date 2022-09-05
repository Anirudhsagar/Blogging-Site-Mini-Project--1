const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:['Mr','Mrs','Miss']
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        unique:true,
        // validate: [validateEmail, 'Please fill a valid email address'],
       // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true

    }


} ,{ timestamps: true })
module.exports = mongoose.model('Author',authorSchema)
