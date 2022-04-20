import {basePath , apiVersion} from '../api/config';
import {ACCESS_TOKEN , REFRESH_TOKEN} from "../utils/constants";

//paquete para decodificar tokens 
import jwtDecode from 'jwt-decode';  

export function getAccessTokenApi () { // devuelve al accessToken siempre y cuando el mismo sea valido 
                                    // si caduco devuelve null 

    const accessToken = localStorage.getItem(ACCESS_TOKEN) ; 

    //condicionales 

    if (!accessToken || accessToken === 'null'){

        return null ; 
    } 

    // el return devuelve null en caso de expiracion y accesToken en caso de vigencia 
    return willExpireToken(accessToken) ? null :accessToken ;

}

export function getRefreshTokenApi () { // devuelve al accessToken siempre y cuando el mismo sea valido 
    // si caduco devuelve null 

const refreshToken = localStorage.getItem(REFRESH_TOKEN) ; 

//condicionales 

if (!refreshToken || refreshToken === 'null'){

return null ; 

} 

// el return devuelve null en caso de expiracion y accesToken en caso de vigencia 
return willExpireToken(refreshToken) ? null :refreshToken ;

}

export function refreshAccessTokenApi(refreshToken){
    //funcion para refrescar el token del lado del cliente 
    //construimos la url  , refresh-access-token es la url del endpoint 
    const url = `${basePath}/${apiVersion}/refresh-access-token`; 

    //creamos un objeto 
    const bodyObj = {
        refreshToken : refreshToken,
    };

    //creamos los parametros de la peticion 
    //parametros del Endpoint que vamos a enviar 

        const params = {                                              // <<PARAMETROS DE PETICION>>

            method: 'POST',                                             //  METODO
            //el parametro que le pasamos a la funcion en forma de JSON      CUERPO 
            body: JSON.stringify(bodyObj),
            headers: {
                "Content-type":"application/json",                        // ENCABEZADO
            }
    
    
        }; 

    // peticion fetch 
    fetch(url,params)
        .then( response => {
            if (response.status !== 200) {
                return null
            } else {
                return response.json
            }
        })
        .then( result => {
            if (!result) {
                //deslogeamos el usuario 
                logout();

            } else { // de lo contrario devuelve un token 
                const {accessToken , refreshToken} = result ; 
                localStorage.setItem(ACCESS_TOKEN , accessToken);
                localStorage.setItem(REFRESH_TOKEN , refreshToken);
            }
        }

        )

}

export function logout(){
    //simplemente borra los token del localStorage 
    //luego se realiza la comprobacion usuario logueado - token en un hook 
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}



//funcion que comprueba expiracion del accesToken 
// devuelve true si expiro el token y false si esta vigente 
function willExpireToken (token){

    const seconds = 60;
    const metaToken = jwtDecode(token);
    //sacamos la fecha de expiracion de la decodificacion 
    const {exp} = metaToken ; 


    const now = (Date.now() + seconds ) / 1000 ; // para cambiar formato de fecha 

    return now > exp  


}


