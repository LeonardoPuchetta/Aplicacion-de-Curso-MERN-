import React from 'react';
//importacion de funciones de react-router-dom
import {BrowserRouter as Router ,Route, Switch } from 'react-router-dom';
//importacion del sistema de rutas 
import routes from './config/routes';
import AdminHome from './pages/Admin';

import AuthProvider from './providers/AuthProvider';


import "./App.scss";





function App() {
 

  return (
    <AuthProvider>
    <Router>
      <Switch>
       
       {routes.map((route,index ) => (  // recorremos routes con la funcion RouteWithSubRoutes
         < RouteWithSubRoutes key= {index} {...route}/> 
        ) )}
        
      </Switch>
    </Router>
    </AuthProvider>

  );
}
// funcion para renderizar ruta padre y 
// pasarle las rutas hijas al componente 
// esta funcion es un componente 

function RouteWithSubRoutes(route){ // recibe ruta y subrutas y renderiza un componente 

  return (
    <Route
    path = {route.path}
    exact = {route.exact}
    //le pasamos al Layout(route.component) el componente mas las rutas hijas 
    render = {props => <route.component routes = {route.routes} {...props}/>}
    />
  );
}


export default App;
