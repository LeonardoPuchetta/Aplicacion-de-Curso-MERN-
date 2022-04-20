import React , {useState} from 'react';
import {Route ,Switch , Redirect} from 'react-router-dom';
import {Layout} from 'antd' ;
import "./LayoutAdmin.scss";
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';

// importacion del hook 
import useAuth from '../hooks/useAuth';

import {getAccessToken ,getRefreshToken} from '../api/auth';



export default function LayoutAdmin(props) { 

    // creacion de estados 
    const [menuCollapsed , setMenuCollapsed] = useState(false);

    //extraemos las rutas de props 
    const {routes} = props; 
    
    // extraemos del Layout de antd los elementos de la vista 
    const {Header , Content , Footer} = Layout ; 

    // sacamos user y isLoading  por medio del Hook 
    const {user , isLoading} = useAuth(); 



    if (!user && !isLoading){  // si el usuario no tiene contenido y termino de cargar 
        return (
            <>
            <Route path='/admin/login' component={AdminSignIn}/>
            <Redirect to ="/admin/login"/>
            </>
        )
    }

    if (user && !isLoading){   // si el usuario tiene contenido y termino de cargar 
    return (
        <Layout>

            <MenuSider menuCollapsed={menuCollapsed}/>

            <Layout className = "layout-admin" style = {{marginLeft : menuCollapsed ? '80px' : '200px'}} >

                <Header className = "layout-admin__header"> 
                    <MenuTop menuCollapsed={menuCollapsed} 
                    setMenuCollapsed={setMenuCollapsed}/> 
                </Header>

                    <Content className = "layout-admin__content">

                     <LoadRoutes routes={routes}/>

                    </Content>

                <Footer className = "layout-admin__footer">
                     Leonardo Puchetta 
                </Footer>

            </Layout>

        </Layout>
    )
    }

    // si el usuario no tiene contenido y no termino de cargar 
    return null ; 

}
function LoadRoutes({routes}){    // funcion componente , genera rutas hijas 

// debemos retornar ambas rutas 

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
 