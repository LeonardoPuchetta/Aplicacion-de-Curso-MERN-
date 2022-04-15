// para crear sistema de rutas 
const express = require("express");
// para trabajar con peticiones http
const bodyParser = require("body-parser");

// generamos la aplicacion 
const app =express();

// traemos la version de la aplicacion 
const {API_VERSION} = require("./config");


//load routings
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const menuRoutes = require('./routers/menu');
const newsletterRoutes = require('./routers/newsletter');
const courseRoutes = require('./routers/course');
const postRoutes = require('./routers/post');


// generamos configuracion del body-parser 
//app.use(express.urlencoded({extended : true}));
//app.use(express.json());

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Configure Header Http
//var cors = require('cors');
//app.use(cors());

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//--------------------------------------------

// Router Basic , para utilizar las rutas 
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);




// exportacion del objeto express 
// todas las configuraciones estan dentro de app
module.exports = app ; 
 







