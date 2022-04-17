// importacion del modelo 
const Course = require ('../models/course') ;

//funcion para crear nuevos cursos 
function addCourse (req, res ) {

    //recogemos los datos del curso del body 
    const body = req.body ; 

    //instanciamos un nuevo curso 
    const course = new Course(body);

    //el nuevo curso va la parte de abajo de la web 
    course.order = 1000 ;

    //guardamos el curso en la base de datos 
    course.save((err , courseStored) => {
        if (err) {
            res.status(400).send({code : 400 , message : 'El curso creado ya existe.'})
        } else {
            if (!courseStored) {
                res.status(400).send({code : 400 , message : 'No se ha podido crear el curso.'})
            } else {
                res.status(200).send({code : 200 , message : 'Curso creado correctamente.'})

            }
        }
    })

}

//funcion para ordenar cursos de la base 
function getCourses (req,res) {
    
    //usamos el modelo para hacer la busqueda en la base 
    Course.find()
            .sort({order : 'asc'})
            .exec((err,courseStored) => {
                    if (err){
                        res.status(500).send({code:500 , message:'Error del servidor.'})
                    } else {
                        if (!courseStored) {
                            res.status(404).send({code:404 , message:'No se ha encontrado ningun curso.'})
                        } else {
                            res.status(200).send({code:200 , courses : courseStored})

                        }
                     }
            })


}

//funcion para borrar cursos segun _id de la base 
function deleteCourse (req,res) {

    //recuperamos id de la peticion 
    const {id} = req.params ;

    Course.findByIdAndRemove(id , (err,courseDeleted) => {
        if (err) {
            res.status(500).send({code:500 , message:'Error del servidor.'})
        } else {
            if (!courseDeleted) {
                res.status(404).send({code:404 , message:'Curso no encontrado.'})

            } else {
                res.status(200).send({code:200 , message:'El curso ha sido eliminado correctamente.'})
            }
        }
    })

}

//funcion para actualizar cursos 
function updateCourse (req,res){


    //recuperamos datos del curso ddel body de la peticion 
    const courseData = req.body ; 

     //recuperamos id de la peticion 
     const {id} = req.params ;

     Course.findByIdAndUpdate(id , courseData , (err , courseUpdate) => {

        if (err) {
            res.status(500).send({code:500 , message:'Error del servidor.'})
        }  else {

            if (!courseUpdate) {
                res.status(404).send({code:404 , message:'Curso no encontrado.'})
            } else {
                res.status(200).send({code:200 , message:'Curso actualizado correctamente.'})

            }
     }

})
}


module.exports = {
    addCourse,
    getCourses,
    deleteCourse,
    updateCourse
}