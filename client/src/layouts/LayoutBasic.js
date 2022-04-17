import React from 'react';
import {Row , Col} from 'antd' ;

import { Route , Switch } from 'react-router-dom';

import MenuTop from './../components/Web/MenuTop';
import Footer from './../components/Web/Footer';

import './LayoutBasic.scss';



export default function LayoutBasic(props) {   // se puede hacer {routes} en vez de props

    // traemos sistemas de rutas 
    const {routes} = props ; 
      // extraemos del Layout de antd los elementos de la vista 
    //const {Footer} = Layout ; 

    return (
        <>
        <Row>
            <Col lg={4}/>
            
            <Col lg={16}>

            <MenuTop/>

            

            </Col>

            <Col lg={4}/>

           
        </Row>
        <LoadRoutes routes={routes}/>  
        <Footer/>
        </>
    )

}

function LoadRoutes({routes}){    // funcion componente 


    return (
        <Switch>
            {routes.map((route , index ) => (

            < Route 
            key = {index}
            path = {route.path} 
            exact = {route.exact}
            //no usamos render pq el componente a renderizar se 
            //define manualmente y no mediante rutas 
            component = {route.component}
            />

            ))}
        </Switch>
        
    )
    
     }
     