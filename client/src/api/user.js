//traemos las constantes a utilizar 
import { message } from 'antd';
import {basePath,apiVersion} from './config';

export function signUpApi (data){    // funcion para dar de alta un usuario 


    //generamos la url del registro de usuario 
    // es la que vemos en el postman ya configurada previamente 

    const url = `${basePath}/${apiVersion}/sign-up`; 

    //parametros del Endpoint que vamos a enviar 

    const params = {                                              // <<PARAMETROS DE PETICION>>

        method: 'POST',                                             //  METODO
        //el parametro que le pasamos a la funcion en forma de JSON      CUERPO 
        body: JSON.stringify(data),
        headers: {
            "Content-type":"application/json",                        // ENCABEZADO
        }


    };

console.log(data)

    //método global fetch() que proporciona una forma fácil
    // y lógica de obtener recursos de forma asíncrona por la red

   return fetch(url,params).then (response => {return response.json()
        
    }).then(result=>{

        if (result.user) {    // si result tiene .user 
            
            return {ok: true,message: "Usuario creado correctamente"}
        
        
        }  
        return {ok: false,message: result.message } 

                    }).catch(err => {    // si da error lo capturamos
                        return {ok: false,message: err.message }})   

}

export function signInApi(data){     //funcion para logear usuario

//construimos la url del registro de usuario 
    const url = `${basePath}/${apiVersion}/sign-in`;
        //parametros del Endpoint que vamos a enviar 

        const params = {                                              // <<PARAMETROS DE PETICION>>

            method: 'POST',                                             //  METODO
            //el parametro que le pasamos a la funcion en forma de JSON    ,  CUERPO 
            body: JSON.stringify(data),
            headers: {
                "Content-type":"application/json",                        // ENCABEZADO
            }
    
        };
        // retornamos un fetch() o sea una peticion asincrona
        return fetch(url,params)

                    .then(response => {

                       return response.json();

                    }).then(result =>{
                       
                        return result; 
                    })
                    .catch(err => {

                        return err.message

                    })

}

export function getUsersApi (token) {   //funcion para obtener usuarios 
    //debe comprobar el token del usuario para devolver lista 

    //construccion de la url mediante la cual se ejecuta la funcionalidad 
    const url = `${basePath}/${apiVersion}/users`;

    //parametros del Endpoint que vamos a enviar 

    const params = {                                              // <<PARAMETROS DE PETICION>>

        method: 'GET',                                             //  METODO
        //el parametro que le pasamos a la funcion en forma de JSON    ,  CUERPO 
       
        headers: {
            "Content-type":"application/json",  
            Authorization : token ,
        }

    };
     // retornamos un fetch() o sea una peticion asincrona
    return fetch (url ,params)
                .then (response => {
                    return response.json()
                })
                .then (result => {
                    return result ; 
                })
                .catch(err=> {
                    return err.message
                }

                )
}

export function getUsersActiveApi (token , status) { // funcion para obtener usuarios activos 
    //debe comprobar el token del usuario para devolver lista 

    //construccion de la url mediante la cual se ejecuta la funcionalidad 
    const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

    //parametros del Endpoint que vamos a enviar 

    const params = {                                              // <<PARAMETROS DE PETICION>>

        method: 'GET',                                             //  METODO
        //el parametro que le pasamos a la funcion en forma de JSON    ,  CUERPO 
       
        headers: {
            "Content-type":"application/json",  
            Authorization : token ,
        }

    };
     // retornamos un fetch() o sea una peticion asincrona
    return fetch (url ,params)
                .then (response => {
                    return response.json()
                })
                .then (result => {
                    return result ; 
                })
                .catch(err=> {
                    return err.message
                }

                )
}

export function uploadAvatarApi(token,avatar,userId) { // funcion para subir avatar 

    //construimos la url de la modificacipon de usuario 
    const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

    //para enviar info o imagen mediante una peticion fetch
    const formData = new FormData();

    //agregamos los pares cleve/valor para el avatar a nuestro form 
    formData.append('avatar', avatar ,avatar.name) ; 

    //definimos parametros de la peticion 
    const params = {
        method : "PUT",
        body : formData , 
        headers: {  
            Authorization : token 
        }
    }

     // retornamos un fetch() o sea una peticion asincrona
     return fetch (url ,params)
     .then (response => {
         return response.json()
     })
     .then (result => {
         return result ; 
     })  // por si tiene error , devuelve el mensaje de error del endpoint 
     .catch(err=> {
         return err.message
     }

     )


}

export function getAvatarApi(avatarName){ // funcion para obtener avatar 

        //construimos la url de recepcion del avatar  
        const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

        return fetch(url).then(
            response => {
                return response.url ;
            }
        ).catch(err => {
            return err.message
        })

}

export function updateUserApi(token,user,userId){  //funcion para cambiar datos de usuario 

    const url = `${basePath}/${apiVersion}/update-user/${userId}`;

    //definimos parametros de la peticion 
    const params = {
        method : "PUT",
        body : JSON.stringify(user) , 
        headers: {  
            "Content-Type": "application/json",
            Authorization : token 
           
        }

        };

    // retornamos un fetch() o sea una peticion asincrona
    return fetch (url ,params)
    .then (response => {
        return response.json()
    })
    .then (result => {
        return result ; 
    })  // por si tiene error , devuelve el mensaje de error del endpoint 
    .catch(err=> {
        return err.message
    }   
        )

}

export function activateUserApi(token,userId,status){  // funcion para cambiar status del usuario 

    const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
    const params ={
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':token        
        },
        //debe recibir un string como status 
        body:JSON.stringify({
            //le damos el nombre de un campo de la base 
            active:status
        })
    };
    //retornamos lo que nos devuelve el servidor
    return fetch(url,params)
            .then(response => {
                return response.json()
            })
                .then(result=> {
                    return result
                })
                    .catch(err=> {
                        return err.message
                    })
    
}

export function deleteUserApi(token , userId) {// funcion para eliminar usuarios 

    const url = `${basePath}/${apiVersion}/delete-user/${userId}`;

    const params ={
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':token        
        },
        
    };

 return fetch(url,params)
            .then(response => {
                return response.json
            })
                .then(result => {
                    return result.message
                })
                    .catch(err => {
                        return err.message
                    } )
}

export function signUpAdminApi(token,data){// funcion para crear nuevo usuario 

    const url = `${basePath}/${apiVersion}/sign-up-admin`;

    const params ={
        method: 'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization':token        
        },
        body: JSON.stringify(data)
    }

    return fetch(url,params).then(
        response => {
            return response.json
        })
            .then(result => {
                return result.message
            })
                .catch(err => {
                    return err.message
                })


}

