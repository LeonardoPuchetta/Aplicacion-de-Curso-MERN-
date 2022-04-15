const mongoose = require('mongoose') ; 

const Schema = mongoose.Schema ; 

const UserSchema =new Schema({   // aca va el modelo de usuario 

    name : String ,
    lastname : String , 
    email : {
        type: String ,
        unique: true ,    
    },
    password : String ,
    role : String,
    active: Boolean,
    avatar: String

});

//exportacion del modelo
 
module.exports = mongoose.model ("User", UserSchema) ; 