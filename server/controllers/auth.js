const jwt = require('../services/jwt');
const moment = require('moment');

const User = require('../models/user');

// funcion que chequea en el servidor si el token ha expirado 
function willExpireToken(token){

const {exp} = jwt.decodeToken(token);

// fecha actual 
const currentDate = moment().unix();

// comparacion de espiracion con fecha actual 
if (currentDate > exp ) {
    return true ;
}
return false ;
}

function refreshAccessToken(req, res){  // refresca el accessToken 

    //necesitamos verificar que el refreshToken es correcto 
    const {refreshToken} = req.body ; 
   
    //nos fijamos si refreshToken sigue vigente 
    const isTokenExpired = willExpireToken(refreshToken);

    if (isTokenExpired) {
        res.status(404).send({message : "El refreshToken ha expirado"});
    } else {
        //si el refreshToken no ha expirado buscamos el user por _id
        //el _id lo sacamos del mismo refreshToken
        const {id} = jwt.decodeToken(refreshToken) ; 

        User.findOne({_id: id } , (err , userStored) => {
            if (err) {
                res.status(500).send({message : "Error del servidor . "});
            } else {

                if (!userStored){
                    res.status(404).send({message : "Usuario no encontrado . "});

                } else {

                    res.status(200).send({
                        //CREAMOS UN NUEVO TOKEN UTILIZANDO EL USUARIO 
                        accessToken : jwt.createAccessToken(userStored),
                        //refreshToken no se actualiza 
                        refreshToken: refreshToken

                    });

                }
            }

        })
    }
    console.log(isTokenExpired);
}

module.exports = {
    refreshAccessToken,
}