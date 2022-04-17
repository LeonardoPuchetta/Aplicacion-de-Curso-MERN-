const express = require('express');

// importacion del controlador 

const AuthController = require('../controllers/auth') ; 

// variable para generar otra ruta 
const api = express.Router();

// creacion del endpoint de tipo post

// cuando hacemos post en /refresh-access-token se ejecuta AuthController.refreshAccessToken
api.post('/refresh-access-token' , AuthController.refreshAccessToken);


//exportamos la funcionalidad 
module.exports = api;