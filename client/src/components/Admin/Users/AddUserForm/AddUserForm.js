import React, {useState} from 'react';

import {Form, Input ,Button ,
    Checkbox , notification , Select ,
     Row , Col } from "antd";
import { MailOutlined , UnlockOutlined ,UserOutlined,LockOutlined} from '@ant-design/icons';


import {signUpAdminApi} from './../../../../api/user';

import {getAccessTokenApi} from './../../../../api/auth';

import './AddUserFrom.scss';

export default function AddUserForm(props){

    const {setIsVisibleModal, setReloadUsers} = props ;

    //creamos un estado para guardar la data recibida en el formulario
    const [userData , setUserData] =  useState({});

    //funcion para agregar el usuario 
    const addUser = event => {
           event.preventDefault() ; // para que no se recargue la pagina en el envio 
            //validacion del formulario 
            if (!userData.name ||
                !userData.lastname||
                !userData.role||
                !userData.password||
                !userData.repeatPassword){
                    notification['error']({
                        message: 'Todos los campos son obligatorios.'
                    })          
                    
                } else {
                    if (userData.password !==userData.repeatPassword){
                        notification['error']({
                            message: 'Las contraseñas tiene que ser iguales.'
                        })          
                    } else {
                        //ya podemos hacer la peticion y encriptamos el password
                        const accessToken = getAccessTokenApi();

                        signUpAdminApi(accessToken,userData)

                                .then(response => {
                                    notification['success']({
                                        message : 'Usuario creado correctamente.'
                                    })
                                    //ocultamos el modal
                                    setIsVisibleModal(false);
                                    //recargamos lista de usuarios 
                                    setReloadUsers(true);
                                    //limpiamos el formulario 
                                    setUserData({});

                                })
                                    .catch(err => {
                                        notification['error']({
                                            message: err
                                        })
                                    })
                    }
                } 
    }



return(
    <div className='add-user-form'>
        <AddForm 
            userData = {userData} 
            setUserData={setUserData}
            addUser={addUser}
            />
    </div>
)

// aqui hacemos el componente formulario 

function AddForm (props){

    const {userData , setUserData , addUser} = props ;

    const {Option} = Select ;
    
    
    return (
        <Form className='form-add' onSubmit = {addUser}>
            <Row gutter='24'>
                <Col span='12'>
                    <Form.Item>
                        <Input
                            value = {userData.name}
                            prefix={<UserOutlined/>}
                            placeholder="Nombre"
                            onChange= {e => setUserData({... userData , name:e.target.value})

                            }
                        />
                        
                    </Form.Item>
                </Col>
                <Col span='12'>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined/>}
                            placeholder="Apellido"
                            value = {userData.lastname}
                            onChange= { e => setUserData({... userData , lastname:e.target.value})

                            }
                        />
                        
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter='24'>

                <Col span='12'>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined/>}
                            placeholder="Correo electronico"
                            value = {userData.email}
                            onChange= {e => setUserData({... userData , email:e.target.value})

                            }
                        />
                        
                    </Form.Item>
                </Col>
                <Col span='12'>
                    <Form.Item>
                        <Select
                            placeholder= 'Selecciona un rol '
                            onChange={e => setUserData({... userData , role: e })}
                            value= {userData.role}>
                            <Option value= 'admin'>Administrador</Option>
                            <Option value= 'editor'>Editor</Option>
                            <Option value= 'reviewer'>Revisor</Option>

                        </Select>
                        
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter='24'>
                <Col span='12'>
                    <Form.Item>
                        <Input
                            type='password'
                            prefix={<LockOutlined/>}
                            placeholder="Contraseña"
                            value = {userData.password}
                            onChange= {e => setUserData({... userData , password:e.target.value})

                            }
                        />
                        
                    </Form.Item>
                </Col>
                <Col span='12'>
                    <Form.Item>
                    <Input
                            type='password'
                            prefix={<LockOutlined/>}
                            placeholder="Repetir contraseña"
                            value = {userData.repeatPassword}
                            onChange= {e => setUserData({... userData , repeatPassword:e.target.value})

                            }
                        />
                        
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type='primary' htmlType="submit" className="btn-submit" >Crear usuario</Button>
            </Form.Item>
        </Form>
    )

}




}