const express = require('express');

// importacion del controlador 
const UserController = require('../controllers/user') ; 
// importacion del connect-multiparty
const multipart = require('connect-multiparty');

// importacion del middleware
const md_auth = require ('../middleware/authenticated');
// el middleware encargado de que la imagen se guarde en uploadDir 
const md_upload_avatar = multipart({uploadDir : "./uploads/avatar"});

// variable para generar otra ruta 
const api = express.Router();

// endpoint de tipo post 

// cuando hacemos post en /sign-up se ejecuta UserController.signUp
api.post ('/sign-up' , UserController.signUp);
// cuando hacemos post en /sign-in se ejecuta UserController.signIn
api.post ('/sign-in' , UserController.signIn);
// cuando hacemos get en /users se ejecuta UserController.getUsers
api.get('/users',[md_auth.ensureAuth] , UserController.getUsers);
// cuando hacemos get en /users se ejecuta UserController.getUsersActive
api.get('/users-active',[md_auth.ensureAuth] , UserController.getUsersActive);

// put en /avatar se ejecuta UserController.uploadAvatar 
// la ruta debe contener el id del usuario enviado por parametros 
// este endpoint va a tener dos middleware 
api.put('/upload-avatar/:id',[md_auth.ensureAuth , md_upload_avatar], UserController.uploadAvatar); 

// endpoint para recuperar url del avatar 
api.get('/get-avatar/:avatarName',UserController.getAvatar);

//endpoint para actualizar datos de usuario en la base 
api.put('/update-user/:id',[md_auth.ensureAuth ], UserController.updateUser);

//endpoint para activar y desactivar usuarios 
api.put('/activate-user/:id',[md_auth.ensureAuth ],UserController.activateUser);

//endpoint para eliminar usuarios 
api.delete('/delete-user/:id',[md_auth.ensureAuth ],UserController.deleteUser);

//endpoint para crear usuarios en panel de admin 
api.post('/sign-up-admin',[md_auth.ensureAuth ],UserController.signUpAdmin);


//exportamos la funcionalidad 
module.exports = api;

