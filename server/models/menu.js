const mongoose = require('mongoose');

// creacion del esquema del modelo 

const Schema = mongoose.Schema ; 
    
const MenuSchema = new Schema ({

title : String , 
url : String , 
order : Number , 
active : Boolean 


});

//exportacion del modelo
 
module.exports = mongoose.model ("Menu", MenuSchema) ; 
