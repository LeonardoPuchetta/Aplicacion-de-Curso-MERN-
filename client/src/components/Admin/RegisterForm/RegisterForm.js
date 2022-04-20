import React , {useState} from 'react';
import "./RegisterForm.scss";

import {Form, Input ,Button ,Checkbox , notification } from "antd";
import { MailOutlined , UnlockOutlined } from '@ant-design/icons';

import {emailValidation , minLengthValidation} from '../../../utils/formValidation';
import {signUpApi} from './../../../api/user';

export default function RegisterForm (){

    // estado para guardar datos 

    const [inputs , setInputs] = useState ({

        email: "",
        password: "",
        repeatPassword:"",
        privacyPolicy: false


    });

    // estado para validar formulario 

    const [formValid , setFormValid] = useState ({
        // ESTADO INICIAL 
        email:false,
        password: false,
        repeatPassword:false ,
        privacyPolicy: false


    });

    // funcion onChange para poder actualizar el formulario 

    const changeForm = e => {
        
        if (e.target.name === 'privacyPolicy'){
            setInputs ({
                ...inputs,
                [e.target.name]: e.target.checked 
            }) } 

            else {   // en este caso son inputs normales accedemos a value 
                setInputs ({
                    ...inputs,
                    [e.target.name]: e.target.value
                }) } 

            };

    // funcion para hacer validacion

    const inputValidation = e => {

       const {type , name} = e.target;

       if (type === 'email'){
         
        setFormValid({...formValid,[name] : emailValidation(e.target)} )
    
    }
       if (type === 'password'){

        setFormValid({...formValid,[name] : minLengthValidation(e.target , 6 )})
    }
       if (type === 'checkbox'){
           
        setFormValid({...formValid,[name] : e.target.checked})
    }


    } 

    const register = async e => {   // funcion que realiza el registro de usuario 

        e.preventDefault();  // supuestamente para evitar redireccionamiento de la pagina 

        //const {email,password , repeatPassword,privacyPolicy} = formValid;

        // traemos los valores ingresados sin usar destructuring 
        const emailVal = inputs.email;
        const passwordVal = inputs.password;
        const repeatPasswordVal = inputs.repeatPassword;
        const privacyPolicyVal = inputs.privacyPolicy;

        if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {

            notification['error']({
                message: 'Todos los campos son obligatorios'
            })

            } else {
                if ( passwordVal !== repeatPasswordVal){

                    notification['error']({
                         message: 'Las contraseñas tiene que ser iguales ' })

                 } else {
                    
                    // le pasamos como data los inputs de usuario 
                    // suponemos que aqui todos los datos estan correctos 
                const result = await signUpApi(inputs);
                
                if (!result.ok){
                    notification["error"]({
                        message : result.message 
                    })
                } else {
                    notification["success"]({
                        message : result.message 
                    });
                    resetForm();    // reseteo del formulario 
                }

                }

        
            }

        console.log(formValid) ; 

    } ;     
        
  const resetForm = () => {   // funcion de reseteo , se usa en register 
      // seleccionamos todos los inputs 
      const input = document.getElementsByName('input');

      for (let i=0 ; i < inputs.length ; i++) {

        inputs[i].classList.remove("success");
        inputs[i].classList.remove("error");

      }
        // reset de inputs 
      setInputs({
        email: "",
        password: "",
        repeatPassword:"",
        privacyPolicy: false
        });
        // reset de formulario 
    setFormValid({
        email:false,
        password: false,
        repeatPassword:false ,
        privacyPolicy: false
    })

  }      


    return (
        <Form className="register-form" onSubmit= {register} onChange = {changeForm} >
            <Form.Item>
                <Input 
                    prefix = {<MailOutlined type='user' style={{color: 'rgba(0,0,0,0.80)'}}/>}
                    type="email" 
                    name= 'email' 
                    placeholder='Correo electronico'
                    className='register-form__input'
                    onChange={inputValidation}
                    value= {inputs.email}
                />
               
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix = {<UnlockOutlined  type='lock' style={{color: 'rgba(0,0,0,0.80)'}}/>}
                    type="password" 
                    name= 'password' 
                    placeholder='Contrasena'
                    className='register-form__input'
                    onChange={inputValidation}
                    value= {inputs.password}
                />
               
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix = {<UnlockOutlined  type='lock' style={{color: 'rgba(0,0,0,0.80)'}}/>}
                    type="password" 
                    name= 'repeatPassword' 
                    placeholder='Repetir contrasena'
                    className='register-form__input'
                    onChange={inputValidation}
                    value= {inputs.repeatPassword}

                />
               
            </Form.Item>
            <Form.Item>
              <Checkbox name = 'privacyPolicy'  onChange={inputValidation} checked={inputs.privacyPolicy}>
                  He leido y acepto la politica de privacidad
              </Checkbox>
      
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' className='register-form__button' onClick = {register}>
                  Crear cuenta
                 </Button>
        
            </Form.Item>

        </Form>
    );
}