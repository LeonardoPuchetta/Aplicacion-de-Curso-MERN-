const express = require('express');

// importacion del controlador 

const CourseController = require('../controllers/course') ; 

// algunos cursos van a ser protegidos 
// solo para usuarios logeados 
const md_auth = require('../middleware/authenticated') ;


// variable para generar otra ruta 
// inicializacion de express 
const api = express.Router();


// endpoints
api.post('/add-course', [md_auth.ensureAuth],CourseController.addCourse);
api.get('/get-courses' ,CourseController.getCourses);
api.delete('/delete-course/:id', [md_auth.ensureAuth],CourseController.deleteCourse);
api.put('/update-course/:id', [md_auth.ensureAuth],CourseController.updateCourse);

module.exports = api ; 