
const jwt = require('jwt-simple');
const moment = require('moment');

// traemos la Key de los tokens 
// clave para tokens 
const SECRET_KEY = "asuhed6lo3ppidhfcxx806";

exports.ensureAuth = (req ,res ,next) => {
    if (!req.headers.authorization) {
        // el usuario no envia cabecera , por lo tanto no hay token 
        return res.status(403).send({message : "La peticion no tiene cabecera de autenticacion"});
    } 
    // formateamos el token     
    const token = req.headers.authorization.replace(/['"]+/g,"");

    try {
        // si todo sale bien decodificamos el token 
        var payload = jwt.decode(token , SECRET_KEY);
        // chequeamos expiracion del token 
        if (payload.exp <= moment.unix()) {
            return res.status(404).send({message : "El token ha expirado"});
        }
    } catch(ex){
    
       // console.log(ex);
       return res.status(404).send({message : "Token invalido."});

    }
    // en caso de que el token sea valido y vigente 
    req.user = payload ;
   // next() da paso a la siguiente funcion que es la ejecucion del endpoint 
    next();

}

