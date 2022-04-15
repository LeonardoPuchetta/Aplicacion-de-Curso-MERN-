const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate');

// creacion del esquema del modelo 

const Schema = mongoose.Schema ;


const PostSchema = new Schema ({

            title : String,
            url :{
                type: String,
                unique: true,

            },
            description: String,
            date : Date 



});
// para que funcione el modulo mongoose-paginate
PostSchema.plugin(mongoosePaginate);

//exportacion del modelo
module.exports = mongoose.model ("Post", PostSchema) ; 