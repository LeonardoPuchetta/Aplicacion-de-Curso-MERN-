// ? 
const fs = require('fs');
const path = require('path');


// para hacer encriptaciones de las contrasenas 
const bcrypt = require ('bcrypt-nodejs');

// 
const jwt = require('../services/jwt');

// importacion del modelo 
const User = require ('../models/user') ;
const { request } = require('http');
const { log } = require('console');
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');


//funcion para crear usuario
function signUp (req , res ){

    //nueva instancia del modelo User
    const user = new User();

    const { name , lastname, email,password,repeatPassword } = req.body ; 

    //asignamos valores uno a uno con user
    user.name= name;
    user.lastname= lastname;
    user.email= email.toLowerCase();
    user.role= "admin";
    user.active=false;

    //creamos una estructura condicional 
    if (!password ||!repeatPassword) {  // si falla algun password 
        
        res.status(404).send({message: "Las contrasenas son obligatorias"})
    } else {

        if (password!==repeatPassword){
            res.status(404).send({message: "Las contrasenas tienen que ser iguales"})
        } else {
            //vamos a encriptar la contrasena 
            bcrypt.hash(password , null , null ,function (err , hash ) {
                    
                if (err){
                    res.status(500).send({message: "Hubo un error de encriptacion "})
                    
                } else {
                    // asignamos la contrasena al usuario 
                    user.password= hash ; 
                    // utilizamos una funcion de mongoose para guardar la contrsena en la base de datos 
                    user.save((err , userStored )=>{
                        if (err){
                            res.status(500).send({message: "Error del servidor , el usuario ya existe "})

                        } else {
                                    if (!userStored){
                                        res.status(404).send({message: "Error al crear el usuario "})

                                    } else {
                                        res.status(200).send({user:userStored})


                                    }
                                }
                                                    })
                }

            }          )
                    

        }
    }}


// funcion para hacer login 
function signIn(req, res){

    const params = req.body ;
    
    const email= params.email.toLowerCase();
    const password= params.password;

    //funcionalidad de mongoose para buscar en la base 
    User.findOne({email} , (err, userStored) => {

        if(err){
            res.status(500).send({message:"Error del servidor."})
        } else {
            if (!userStored){
                res.status(404).send({message:"Usuario no encontrado."})
            } else {

                // comparacion de contrasenas con bcrypt la ingresada con la encriptada
                //el valor de la contrasena encriptada es userStored,password 
                bcrypt.compare(password,userStored.password , (err,check)=>{

                    if (err){
                        res.status(500).send({message:"Error del servidor."})

                    } else if (!check) {
                       
                        res.status(404).send({message:"La contrasena es incorrecta."})


                    } else { //tengo que chequear que el usuario este ACTIVE 

                        if (!userStored.active){
                            res.status(200).send({code: 200 ,message:"El usuario no se ha activado."})
                        } else {
                                // si el usuario es correcto enviamos al front el access token 
                                //y el refresh token 
                            res.status(200).send({
                                accessToken : jwt.createAccessToken(userStored),
                                refreshToken : jwt.createRefreshToken(userStored)
                            })

                        }
                    }
                })
            }
        }
    }) 

}

//funcion que nos devuelve los usuarios de la base 
function getUsers(req , res) {
    User.find().then(users => {
        if (!users){
            res.status(404).send({message : "No se ha encontrado ningun usuario"});
        } else {
            res.status(200).send({users});
        }
    })
}

function getUsersActive(req , res) {

    const query = req.query ; 
    
    User.find({active : query.active}).then(users => {
        if (!users){
            res.status(404).send({message : "No se ha encontrado ningun usuario"});
        } else {
            res.status(200).send({users});
        }
    })
}

// funcion para subir Avatar 
function uploadAvatar(req,res){

    const params = req.params ; 

    console.log(req.files);

    // busqueda del usuario con el id 
    User.findById({_id: params.id} , (err , userData)=> {

        if (err) {  // error en el servidor 
            res.status(500).send({message: 'Error del servidor.'})
        } else {
            if (!userData){
                res.status(404).send({message: 'No se ha encontrado ningun usuario.'})

            } else {
                
                let user= userData ;
                console.log(user);
                
                //El fichero vendra dentro de req en el objeto files
               
                console.log('Archivos enviados : ');
                console.log(req.files);

                // tratamiento del fichero , si es que viene ...
                if (req.files){

                        let filePath = req.files.avatar.path ; 
                        let fileName = filePath.replace(/^.*[\\\/]/, "");

                        //array separado por el / con 3 elementos
                        //let fileSplit = filePath.split('/');
                        //sacamos del array el nombre del archivo 
                        //el archivo de imagen queda con un id unico tipo xxxxxxxxxx.jpg o png 
                        //let fileName = fileSplit[2];
                        // obtenemos la extension del archivo 
                        let extSplit = fileName.split('.'); 
                       
                        //extension del archivo 
                        let fileExt = extSplit[1];
                        
                            // chequeamos la extension 
                            if (fileExt !== "png" && fileExt!=='jpg' ){
                                res
                                .status(400)
                                .send(
                                     {message: "La extension de la imagen no es valida. (Extensiones permitidas : .png y .jpg)"}
                                    )
                                        } else {
                                            // para updatear usuario  usuario 

                                            user.avatar = fileName  ;
                                            User.findByIdAndUpdate({_id: params.id} , user ,(err, userResult) => {
                                                if (err) {
                                                    res.status(500).send({message: 'Error del servidor .'});
                                                } else {
                                                    if(!userResult) {
                                                    res.status(404).send({message: 'No se ha encontrado ningun usuario.'});

                                                    } else {
                                                        res.status(200).send({avatarName : fileName});
                                                    }
                                                }
                                            });

                            }

                        } 

            } 
        }
    })
   

}

// funcion para recu[erar url del avatar 
function getAvatar (req , res) {

// obtenemos nombre de la imagen por medio de params 
const avatarName = req.params.avatarName ; 
// completamos url de la imagen 
const filePath = "./uploads/avatar/" + avatarName ; 

fs.exists(filePath , exists => {

    if (!exists) {
        res.status(404).send({message: 'El avatar buscado no existe.'})
    } else {
        res.sendFile(path.resolve(filePath))
    }

})
}

// funcion para actualizar datos de usuario en la base 
async function updateUser (req , res) {

    const userData = req.body ;
    // para que el correo se guarde en mayusculas 
    userData.email = req.body.email.toLowerCase();
    const params = req.params;

    if (userData.password){
       await bcrypt.hash(userData.password , null , null , (err ,hash )=> {
                if (err){
                    res.status(500).send({message: 'Error al encriptar la contraseña.'})
                } else { 
                    //el hash es el password encriptado
                    userData.password = hash ; 
                }
        });
    };

    // buscamos usuario y le pasamos los datos que 
    // queremos actualizar 
    User.findByIdAndUpdate({_id: params.id } , userData , (err, userUpdate)=> {
        if (err) {
            res.status(500).send({message: 'Error en el servidor .'})
        } else {
            if (!userUpdate) {
                res.status(404).send({message: 'No se ha encontrado el usuario . '})
            } else {
                res.status(200).send({message : 'Usuario actualizado correctamente.'})
            }
        }
    });


    }


// funcion para activar y desactivar usuarios 
function activateUser(req,res){

    const {id} = req.params ; 
    // en el body enviamos el status que queremos darle al usuario 
    const {active} = req.body ;

    
    //updateamos el usuario 
    User.findByIdAndUpdate(id ,{active}, (err ,userStored) => { // recibe error o usuario guardado 

        if (err){
            res.status(500).send({message:'Error del servidor.'})
        } else {
            if (!userStored){
                res.status(404).send({message:'No se ha encontrado el usuario.'})
            } else {
                if (active === true){
                    res.status(200).send({message:'Usuario activado correctamente.'})
                } else {
                    res.status(200).send({message:'Usuario desactivado correctamente.'})

                }
            }
        }


    })



}   

// funcion para eliminar usuarios 
function deleteUser(req,res){

    const {id} = req.params ;
    User.findByIdAndRemove(id , (err,userDeleted) => {
        if (err){
            res.status(500).send({ message:'Error del servidor.'})
        } else {
            if (!userDeleted){
                res.status(404).send({message:'Usuario no encontrado.'})
            } else {
                res.status(200).send({message:'El usuario ha sido eliminado correctamente.'})
            }
        }
    })

}
// funcion para crear usuarios en el panel de Admin
function signUpAdmin(req , res ){
 
    //inicializamos un nuevo usuario vacio
    const user = new User();
    // recibiremos por el body de la req los datos del usuario nuevo 
    const {name,lastname,email,role,password} = req.body;

    user.name = name ;
    user.lastname = lastname;
    user.role = role;
    user.email = email.toLowerCase();
    //los usuarios nuevos ingresan como activos
    user.active = true ;
    //asignacion del password 

    if(!password){
        res.status(500).send({message:'La contraseña es obligatoria.'})
    } else {

        bcrypt.hash(password,null,null,(err,hash) => {
                if (err){
                    res.status(500).send({message:'Error al encriptar la contraseña.'})
                }else {
                    //asignamos el password encriptado
                    user.password=hash;
                }
        })

    }

    //creacion del usuario mediante la funcion de mongoose save()
    user.save((err,userStored) => {
            if (err){
                res.status(500).send({message:'El usuario ya existe.'})
            }else {
                if(!userStored){
                    res.status(500).send({message:'Error al crear el nuevo usuario.'})
                } else {
                    //mandamos el objeto user con los datos de userStored
                    //res.status(200).send({user : userStored});
                    res.status(200).send({message:"Usuario creado correctamente."});

                }
            }
    })



}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive,
    uploadAvatar,
    getAvatar,
    updateUser,
    activateUser,
    deleteUser,
    signUpAdmin
};