import React , {useCallback, useState , useEffect} from 'react';
import {Avatar , Form , Icon , Input , Select , Button , Row , Col ,notification, message} from 'antd';
import {useDropzone} from 'react-dropzone';
import "./EditUserForm.scss";
import { UpCircleFilled } from '@ant-design/icons';
import { MailOutlined , UnlockOutlined ,UserOutlined , LockOutlined} from '@ant-design/icons';

import {getAvatarApi , updateUserApi ,uploadAvatarApi} from '../../../../api/user'  ; 
import {getAccessTokenApi} from '../../../../api/auth';
import NoAvatar from '../../../../assets/img/png/no-avatar.png'
import FormItem from 'antd/lib/form/FormItem';


export default function EditUserFrom(props){

    const {user , setIsVisibleModal,setReloadUsers} = props ;

    // estado para almacenar el avatar 
    const [avatar , setAvatar] = useState(null); 


    //estado para guardar datos del usuario 
    const [userData , setUserData] = useState({});


    // effecto para actualizar datos de usuario
    useEffect(()=> {
        setUserData({
            name : user.name , 
            lastname : user.lastname,
            email : user.email,
            role: user.role,
            avatar : user.avatar,
            password:'',
            repeatPassword: ''
            
        })
    },[user]);



    // efecto para actualizar avatar en formulario
    useEffect(()=> {
        if(user.avatar){
            getAvatarApi(user.avatar).then( response => {
                setAvatar(response)
            })
        } else {
            setAvatar(null);
        }

    },[user]);


    // efecto para actualizar avatar 
    useEffect(()=>{
        if (avatar) {
            setUserData({...userData, avatar : avatar.file})
        }
    }, [avatar]) ;

    //funcion que se ejecuta cuando queremos actualizar usuario 
    // funcion de tipo flecha que recibe un evento , se ejecuta en 
    // el submit del button de Form 
    const updateUser = e => { 
        
        //para evitar que se recargue la pagina cuando enviamos el formulario 
        e.preventDefault();
        //obtenemos el token
        const token = getAccessTokenApi() ;
        //obtenemos los datos del usuario 
        let userUpdate = userData ;  

        if (userUpdate.password || userUpdate.repeatPassword ) {
            if (userUpdate.password !== userUpdate.repeatPassword){
                notification['error']({
                    message : 'Las contraseñas deben ser iguales.'
                });
                //si no son iguales las contrasenas bloquea ejecucion de la funcion 
                return ;
            } else {
                delete userUpdate.repeatPassword ; 
            }
           
        }
        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email){
            notification['error']({
                message : 'Correo, nombre y apellido son obligatorios.'
            })
            // para que no continue
            return;
        }
        //comprobacion del avatar
        if (typeof userUpdate.avatar === 'object'){
            
            uploadAvatarApi(token,userUpdate.avatar,user._id).then( result => {
                userUpdate.avatar = result.avatarName;
                //luego actualizamos los datos 
                updateUserApi(token ,userUpdate , user._id).then(result => {
                    notification['success']({
                        message : result.message
                    });
                    setReloadUsers(true);
                    setIsVisibleModal(false);

                   
                });
                
            });
        } else {  // actualizamos datos sin avatar 
            updateUserApi(token ,userUpdate , user._id).then(result => {
                notification['success']({
                    message : result.message
                });
                setReloadUsers(true);
                setIsVisibleModal(false);

                
               
            });

        }

        
        };

    return (
    <div className= 'edit-user-form'>
         <UpLoadAvatar avatar = {avatar} setAvatar={setAvatar}/>
         <EditForm  userData={userData} 
                    setUserData={setUserData}
                    updateUser={updateUser} />
    </div>
    )
}


// creamos una funcion componente para subir el avatar 
function UpLoadAvatar(props) {

    //recibe informacion de un estado 
    const {avatar , setAvatar} = props ; 
    //estado para almacenar url del avatar
    const [avatarUrl , setAvatarUrl] = useState(null);

    // para tener actualizada la url del avatar 
    useEffect(()=> {
            if (avatar) {
                if (avatar.preview){
                    setAvatarUrl(avatar.preview)
                } else {
                    setAvatarUrl(avatar)
                }
            } else {
                setAvatarUrl(null)
            }
    },[avatar]) ;


    //creacion del onDrop 
    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file , preview : URL.createObjectURL(file)})
        } , 
        [setAvatar]
    );
    // utilizacion del useDrop 
    const {getRootProps , getInputProps , isDragActive } = useDropzone({

        //configuramos que imagen se podra subir 
        accept: "image/jpeg , image/png",
        noKeyboard : true , 
        onDrop
    }); 

    return (
        //getRootProps es necesario para poder arrastrar las imagenes al div 
        // isDragActive es true si tenenos una imagen por encima 
        <div className = 'upload-avatar' {...getRootProps()}> 
            <input {...getInputProps()}/>
                {isDragActive ? (
                    <Avatar size = {150} src = {NoAvatar} />
                ) : (
                    <Avatar size = {150} src = {avatarUrl ? avatarUrl : NoAvatar} />
                ) }
        </div>
    )
}

// creamos una funcion componente para el formulario 
function EditForm(props){

// recibe datos del usuario 
const { userData , setUserData , updateUser} = props ; 
// tambien precisamos las Option del Select de antd 
const {Option} = Select;



return (
    <Form className="form-edit" onSubmit={updateUser}>
        <Row gutter={24}>
            <Col span = {12}> 
                <Form.Item>
                    <Input 
                        prefix={<UserOutlined/>} // logo del input 
                        placeholder="Nombre"  // nombre del input 
                        value = {userData.name}  // valor por default 
                        onChange={e => setUserData({...userData, name:e.target.value})} // funcion 
                                                                            // asociada al cambio 

                    />
                </Form.Item>
            </Col>
            <Col span = {12}>
            <Form.Item>
                    <Input 
                        prefix={<UserOutlined/>} // logo del input 
                        placeholder="Apellido"  // nombre del input 
                        value = {userData.lastname}  // valor por default 
                        onChange={e => setUserData({...userData, lastname:e.target.value})} // funcion 
                                                                            // asociada al cambio 

                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span = {12}>
            <Form.Item>
                    <Input 
                        prefix={<MailOutlined/>} // logo del input 
                        placeholder="Correo electronico"  // nombre del input 
                        value = {userData.email}  // valor por default 
                        onChange={e => setUserData({...userData, email:e.target.value})} // funcion 
                                                                            // asociada al cambio 

                    />
                </Form.Item>
            </Col>
            <Col span = {12}>
            <Form.Item>
                <Select 
                   placeholder= "Selecciona un rol"
                   onChange={e => setUserData({...userData, role: e})}
                   value={userData.role} 

                >
                    <Option value='admin'>Administrador</Option>
                    <Option value='editor'>Editor</Option>
                    <Option value='reviewer'>Revisor</Option>


                </Select>
            </Form.Item>
            </Col>
        </Row>
        <Row gutter={24}>
            <Col span = {12}> 
            <FormItem>
                <Input
                    value= {userData.password}
                    prefix={<LockOutlined/>} // logo del input 
                    type='password'
                    placeholder="Contraseña"  // nombre del input 
                    onChange={e => setUserData({...userData, password:e.target.value})} // funcion 
                                                                        // asociada al cambio  
                />
            </FormItem>
            </Col>
            <Col span = {12}>
            <FormItem>
                <Input
                    value = {userData.repeatPassword}
                    prefix={<LockOutlined/>} // logo del input 
                    type='password'
                    placeholder="Repetir contraseña"  // nombre del input 
                    onChange={e => setUserData({...userData, repeatPassword:e.target.value})} // funcion 
                                                                        // asociada al cambio  
                />
            </FormItem>
            </Col>
        </Row>

        <Form.Item>
            <Button type='primary' htmlType="submit" className='btn-submit' onClick ={updateUser}>
                Actualizar Usuario
            </Button>
        </Form.Item>

    </Form>
)

}