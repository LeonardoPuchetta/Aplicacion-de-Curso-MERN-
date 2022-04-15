import React , {useState , useEffect , createContext} from 'react';

import {logout, getAccessTokenApi ,
     getRefreshTokenApi , refreshAccessTokenApi } from '../api/auth' ; 

import jwtDecode from 'jwt-decode' ; 

//creamos contexto sin valor predeterminado 
export const AuthContext = createContext(); 

export default function AuthProvider(props){

    // children es todo lo que envuelve AuthProvider en App.js 
    const {children} = props ; 

    // creamos un estado para guardar info de usuario y estado de "cargando"
    const [user , setUser] = useState({
        user : null ,
        isLoading : true  // que esta  cargando 
    });

    // nos aseguramos una revision de loging en toda la app 
    useEffect( () => {
        checkUserLoging(setUser); 
    } , [])

    return <AuthContext.Provider value = {user}>{children}</AuthContext.Provider>
    
}

// comprueba si el usuario esta logeado correctamente 
function checkUserLoging(setUser) {

    const accessToken = getAccessTokenApi();
    
    if (!accessToken) {  // si es invalido 

        const refreshToken = getAccessTokenApi();

        if (!refreshToken){  // si tambien es invalido el refresh 
                                // deslogeamos y reseteamos usuario 
            logout();
            setUser({
                user: null,
                isLoading : false   // acabamos la ejecucion del authProvider
            })

        } else {
            refreshAccessTokenApi(refreshToken);
        }
    }  else { // si el accessToken es valido 

        setUser({
            //guardamos datoss de usuario del token en es estado creado 
            user: jwtDecode(accessToken),
            isLoading : false   
        })
         
    }
    


}

