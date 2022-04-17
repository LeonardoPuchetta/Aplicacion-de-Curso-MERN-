const mongoose = require('mongoose');

// creacion del esquema del modelo 

const Schema = mongoose.Schema ; 
    
const CourseSchema = new Schema ({

        idCourse : {
            type : Number,
            unique : true ,
            required : true
        } , 
        link : String,
        coupon : String,    // para agregar cupon a la url
        price : Number,
        order : Number



});

//exportacion del modelo
 
module.exports = mongoose.model ("Course", CourseSchema) ; 