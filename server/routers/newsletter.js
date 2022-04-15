const express = require('express');

// importacion del controlador 
const NewsletterController = require('../controllers/newsletter');

// variable para generar otra ruta ,inicializamos rutas de express
const api = express.Router();

//endpoints
//en este caso se manda el correo a registrar por url 
api.post('/suscribe-newsletter/:email' , NewsletterController.suscribeEmail);

//exportamos la funcionalidad 
module.exports = api;

