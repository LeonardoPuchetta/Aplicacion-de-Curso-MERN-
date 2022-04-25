
// importacion de mongoose
const mongoose = require("mongoose");

//importacion de app
const app = require("./app");

// puerto donde corre el servidor 
const PORT_SERVER = process.env.PORT || 3977;

//traemos la version de la api , la direccion del servidor local y el puerto 
const {API_VERSION , IP_SERVER , PORT_DB} = require("./config");

// << CONEXION DE LA BASE DE DATOS CON mongoose >>

// para solucionar un error en las peticiones 

mongoose.set('useFindAndModify', false);

//conexion 

mongoose.connect(`mongodb+srv://Leonardo:ratm2000@appcursos.nal5u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true , useUnifiedTopology: true }, (err,res)=> {
if (err) {
    throw err
} else {

    console.log("La conexion a la base de datos es correcta ");
    app.listen(PORT_SERVER , () => {
        console.log("###########################");
        console.log("###########API-REST########");
        console.log("###########################");
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
    } )
}

});

// <<------------------------------------------------->>
