import React from 'react';

import './../SignIn/SignIn.scss';
import {Layout , Tabs , Button } from 'antd';
import {Redirect} from 'react-router-dom';
import LeoLogo from '../../../assets/img/jpg/logo.JPG';

import RegisterForm from './../../../components/Admin/RegisterForm';
import LoginForm from './../../../components/Admin/LoginForm/LoginForm';

import {getAccessTokenApi} from '../../../api/auth' ;

export default function SignIn(){

        const {Content} = Layout ;
        const {TabPane} = Tabs ;

    // vamos a bloquear esta page para usuarios logeados , 
    // haciendo un redirect 
    if (getAccessTokenApi()) {
        return <Redirect to= '/admin'/>
    }
    return (
     <Layout className='sign-in'>
         <Content className="sign-in__content">
             <h1 className="sign-in__content-logo">
                 <img src={LeoLogo} alt="leonardo"/>
             </h1>

             <div className='sign-in__content-tabs'>
                 <Tabs type='card'>
                    <TabPane tab={<span>Entrar</span>} key = '1'>

                    <LoginForm/>

                    </TabPane>

                    <TabPane tab={<span>Nuevo Usuario</span>} key = '2'>
                        
                    <RegisterForm/> 

                    </TabPane>
                  
                 </Tabs>
             </div>
             <div>
                 <Button className='btn' href='/'>Volver</Button>
             </div>

         </Content>

         
     </Layout>
    )
}