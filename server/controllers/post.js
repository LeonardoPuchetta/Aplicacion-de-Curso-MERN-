const Post = require('../models/post');

function addPost(req,res){

   const body = req.body ;

   //creamos nuevo post con lo recibido en el body 
   const post = new Post(body);

   //guardamos la nueva instancia
   post.save((err,postStored)=> {
       if (err){
           res.status(500).send({code:500 , message:'Error del servidor.'})
       } else {
           if (!postStored){
               res.status(400).send({code:400,message:'No se ha podido crear el post.'})
           } else {
               res.status(200).send({code:200,message:'Post creado correctamente.'})
           }
       }
   })
}

function getPosts(req,res){
    
    //recuperamos info de la url por mediuo del query 
    const {page = 1 ,limit = 10} =req.query;
    
    //opciones de paginacion 
    const options ={
        page:page,
        limit:parseInt(limit),
        //orden de forma descendente
        sort:{date:'desc'}
    }
    //usamos la Paginacion para buscar en la base de datos
    Post.paginate({},options,(err,postsStored) => {
        if (err){
            res.status(500).send({code:500 , message:'Error del servidor.'})
        } else {
            if (!postsStored){
                res.status(404).send({code:404,message:'No se ha encontrado nungun post.'})
            } else {
                res.status(200).send({code:200,posts:postsStored})
            }
        }
    })
}

//para actualizar posts 
function updatePost (req,res){
    
    //datos del body
    const postData = req.body;
    const {id} = req.params;

    Post.findByIdAndUpdate(id ,postData,(err,postUpdate)=>{
        if (err){
            res.status(500).send({code:500 , message:'Error del servidor.'})
        } else {
            if (!postUpdate){
                res.status(404).send({code:404 , message:'No se ha encontrado ningun post.'})
            } else {
                res.status(200).send({code:200,message:'Post actualizado correctamente.'})
            }
        }
    })

}

function deletePost (req,res){

    const {id} = req.params;

    Post.findByIdAndRemove(id,(err,postDelete)=>{
        if (err){
            res.status(500).send({code:500 , message:'Error del servidor.'})
        } else {
            if (!postDelete){
                res.status(404).send({code:404 , message:'Post no encontrado.'})
            } else {
                res.status(200).send({code:200,message:'Post eliminado correctamente.'})
            }
        }
    })

}

function getPost(req,res){

    const {url} = req.params;

    Post.findOne({url} , (err,postStored) =>{
        if (err){
            res.status(500).send({code:500 , message:'Error del servidor.'})
        } else {
            if (!postStored){
                res.status(404).send({code:404 , message:'Post no encontrado.'})
            } else {
                res.status(200).send({code:200, post:postStored});
            }
        }
    })

}

module.exports = {
    addPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
}