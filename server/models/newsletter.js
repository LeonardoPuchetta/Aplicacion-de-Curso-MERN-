const mongoose = require('mongoose');

const Schema = mongoose.Schema ; 

const NewsletterSchema = new Schema({  // modelo de newsletter

    email : {
        type: String,
        unique: true
    }


})

//exportacion del modelo
 
module.exports = mongoose.model ("Newsletter", NewsletterSchema) ; 