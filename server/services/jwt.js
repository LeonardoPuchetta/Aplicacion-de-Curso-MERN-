const jwt = require('jwt-simple');
const moment = require('moment');

// clave para tokens 
const SECRET_KEY = "asuhed6lo3ppidhfcxx806";

// creacion de una funcion exportable 
// en este caso la de ACCESS TOKEN 
exports.createAccessToken = function (user){

    // estructura para el token
    //creamos un objeto 
    const payload = {
        id : user._id,
        name : user.name,
        lastname : user.lastname,
        email: user.email,
        role : user.role,
        //fecha de creacion del token
        createToken:moment().unix(),
        //fecha de expiracion del token
        exp: moment()
            .add(3 , "hours")
            .unix()
        
    }

    // retorno de la funcion 
    return jwt.encode(payload , SECRET_KEY);
    // puede llevar un tercer parametro opcional 
    // para elegir el algoritmo de decodificacion 

}

// creacion de una funcion exportable 
// en este caso la de REFRESH TOKEN 

exports.createRefreshToken = function (user){

    const payload = {
        //para comprobar que el id es correcto
        id : user._id,
        //establecemos un tiempo de refresco 
        exp: moment()
        .add(30 , "days")
        .unix()
    }

    return jwt.encode(payload,SECRET_KEY);

}

//creacion de una funcion para DECODIFICAR el token 
//decodificara tanto el access token como el refresh token 

exports.decodeToken = function(token){

    return jwt.decode(token , SECRET_KEY , true);

}
