import React , {useState} from 'react';

import {ACCESS_TOKEN , REFRESH_TOKEN} from "../../../utils/constants";

import {Form, Input ,Button ,Checkbox , notification , Icon  } from "antd";
import { MailOutlined , UnlockOutlined } from '@ant-design/icons';

import {signInApi} from './../../../api/user';

//------------------------------------------////

import "./LoginForm.scss";

export default function LoginForm () {

    //definicion de estado para guardar datos 
    const [inputs , setInputs ] = useState({
       
        email: '',
        password: ''

    });

    // funcion onChange para poder actualizar el formulario 
    const changeForm = e => {

       setInputs({
           ...inputs, // para traer los valores 
           [e.target.name]: e.target.value // el name es el mismo que en el Input 
           // esto basta para los dos campos 

       })

    }

    //funcion de login 
    const login = async e =>{

    e.preventDefault(); // para evitar que recarge la pagina al presionar button 

    const result = await signInApi(inputs); 

    if (result.message){ // solo hay mensaje si hay error (ver signInApi())
      notification['error']({
        message: result.message
      }) ;

    } else {
      const {accessToken ,refreshToken } = result // destructuring para traer los token 

      //guardamos en el localStorage los token 
      localStorage.setItem(ACCESS_TOKEN,accessToken);
      localStorage.setItem(REFRESH_TOKEN,refreshToken);

      //mensaje de exito 
      notification['success']({
        message: "Login correcto."
      }) ;

      //redireccionamiento una vez hecho el login 
      window.location.href = "/Admin";

      
    }

    }




    return (
        <Form className='login-form' onChange = {changeForm}>
              <Form.Item>
                <Input 
                  prefix = {<MailOutlined type='user' style = {{color: 'rgba (0, 0 ,0, 0.25 )' }} />}
                  type = 'email'
                  name = 'email'
                  placeholder = 'Correo electronico'
                  className = 'login-form__input'
                />
               
            </Form.Item>
            <Form.Item>
                <Input 
                  prefix = {<UnlockOutlined type='user' style = {{color: 'rgba (0, 0 ,0,0.25 )' }} />}
                  type = 'password'
                  name = 'password'
                  placeholder = 'Contraseña'
                  className = 'login-form__input'
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' className='login-form__button' onClick = {login} >
                  Entrar 
                </Button>
        
            </Form.Item>
        </Form>
    )
}