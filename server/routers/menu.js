const express = require('express');

// importacion del controlador 
const MenuController = require('../controllers/menu');


// importacion del middleware para hacer la autenticacion 
const md_auth = require ('../middleware/authenticated');

// variable para generar rutas
const api = express.Router();

// endpoints 


api.post('/add-menu', [md_auth.ensureAuth],MenuController.addMenu);
//end point no protegido , accesible para cualquier usuario 
api.get('/get-menus', MenuController.getMenus);

api.put('/update-menu/:id', [md_auth.ensureAuth],MenuController.updateMenu);
api.put('/activate-menu/:id',[md_auth.ensureAuth],MenuController.activateMenu);
api.delete('/delete-menu/:id',[md_auth.ensureAuth],MenuController.deleteMenu);


//exportamos la funcionalidad 
module.exports = api;