import React ,{useState , useEffect}  from 'react';

import {Switch ,List ,Avatar , Icon , Button ,notification , Modal as ModalAntd } from 'antd';
import {EditOutlined ,CloseCircleOutlined ,StopOutlined ,DeleteOutlined ,CheckOutlined } from '@ant-design/icons';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../../components/Modal/Modal';
import EditUserForm from './../EditUserForm/EditUserForm';
import {activateUserApi, getAvatarApi , getUsersActiveApi , deleteUserApi} from '../../../../api/user';
//para poder recibir el token 
import {getAccessTokenApi} from '../../../../api/auth';
import AddUserForm from '../AddUserForm';


import "./ListUsers.scss";

//guardamos el Modal de confirmacion en una constante 
// es un componente de dicho paquete 
const {confirm } = ModalAntd ; 


export default function ListUsers(props) {

//recibe ambas listas como props 
const  {usersActive , usersInactive , setReloadUsers } = props ; 

// creamos estado para saber si hay usuarios activos o inactivos 
const [viewUsersActive , setViewUsersActive] = useState(true);

// estado para visibilidad del Modal 
const [isVisibleModal , setIsVisibleModal] = useState(false);

// estado para almacenar el titulo del Modal 
const [modalTitle , setModalTitle] = useState("");

// estado para manejar el contenido del Modal 
const [modalContent,setModalContent] = useState(null);

// funcion que despliega el modal de nuevo usuario
const addUserModal = () => {

    setIsVisibleModal(true);
    setModalTitle('Creando nuevo usuario');
    setModalContent(
   <AddUserForm 
    setIsVisibleModal={setIsVisibleModal} 
    setReloadUsers={setReloadUsers}/>
    )

}


return (
    <div className='list-users'>

        <div className="list-users__header">
                <div className='list-users__header-switch'>
                    <Switch
                        defaultChecked  
                        onChange = {() => setViewUsersActive(!viewUsersActive)}
                    />
                    <span>
                        {viewUsersActive? "Usuarios activos" : "Usuarios inactivos"}
                    </span>
                </div>
                <Button type='primary' onClick={addUserModal}> 
                    Nuevo usuario
                </Button>
        </div>
      

        {viewUsersActive? (
        <UsersActive 
        usersActive = {usersActive}
        setIsVisibleModal = {setIsVisibleModal}
        setModalTitle = {setModalTitle}
        setModalContent = {setModalContent}
        setReloadUsers={setReloadUsers}
        

        />
        ) : (
        <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers}/>
         
         )}

        <Modal 
            title = {modalTitle}
            isVisible = {isVisibleModal}
            setIsVisible = {setIsVisibleModal}
        >    
            {modalContent}
        </Modal> 

    </div>
)
// creamos dos funciones componente :

function UsersActive(props){

    const {usersActive , setIsVisibleModal , setModalContent , setModalTitle,setReloadUsers} = props ;

    const editUser = user => {
        setIsVisibleModal(true) ;

        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);

        setModalContent(<EditUserForm user = {user} setIsVisibleModal={setIsVisibleModal} setReloadUsers= {setReloadUsers}/>)
    }

    return (
        <List
        className = 'users-active'
        itemLayout = 'horizontal'
        //array de datos que le vamos a pasar 
        dataSource = {usersActive}
        //lo que va arenderizar por cada iteracion correspondiente a 
        // el numero de elementos de dataSource
        renderItem = {user => <UserActive user = {user} editUser={editUser} setReloadUsers={setReloadUsers}/>}
        
        />

   
    );
};

function UserActive(props){ // componente que maneja un solo usuario de la lista 

const {user , editUser , setReloadUsers } = props ; 

const [avatar , setAvatar ] = useState(null);

useEffect (()=> {
    if (user.avatar) {
        getAvatarApi(user.avatar).then(response => {
            setAvatar(response)
        })
    } else {
        setAvatar(null)
    }
},[user]) ;

// funcion para desactivar usuarios 
const desactivateUser = () => {

    // obtenemos el token 
    const accessToken = getAccessTokenApi();
    activateUserApi(accessToken,user._id,false )
            .then(response => {
                notification['success']({
                    message: response.message
                });
                setReloadUsers(true);
            })
                .catch(err => {
                    notification['error']({
                        message: err.message
                    })
                })


};

// funcion para mostrar modal de confirmacion al eliminar usuario 
const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();

    confirm ({
        title:'Eliminando usuario',
        content:`¿Estas seguro que quieres eliminar a ${user.email}?`,
        okText: 'Eliminar',
        okType:'danger',
        cancelText:'Cancelar',
        onOk(){
            deleteUserApi(accessToken,user._id)
                    .then(response =>{
                        notification['success']({
                            message: 'El usuario se ha eliminado correctamente. '
                        });
                        //refrescamos la pagina 
                        setReloadUsers(true);
                    }).catch(err => {
                        notification['error']({
                            message:err
                        })
                    })
        }
    })
}

return ( // retornara todo un renderItem por usuario de la lista 
    <List.Item
    actions = {[
        <Button
                type = 'primary'
                onClick = { () => editUser(user)}
            ><EditOutlined/>
        </Button>, 
          <Button
          type = 'danger'
          onClick = {desactivateUser}
            ><StopOutlined/>
        </Button> ,
         <Button
         type = 'danger'
         onClick = { showDeleteConfirm }
           ><DeleteOutlined />
       </Button> 


    ]}
>
    <List.Item.Meta
        avatar = {<Avatar src= {avatar ? avatar : NoAvatar}/>}
        title = {`
            ${user.name ? user.name : "..."}
            ${user.lastname ? user.lastname : "..."}
        `}
        description = {user.email}
    />

    
</List.Item>
)
}


function UsersInactive(props){

    const {usersInactive , setReloadUsers} = props ;

    return (
        <List
        className = 'users-active'
        itemLayout = 'horizontal'
        //array de datos que le vamos a pasar 
        dataSource = {usersInactive}
        //lo que va arenderizar por cada iteracion correspondiente a 
        // el numero de elementos de dataSource
        renderItem = {user => <UserInactive user = {user} setReloadUsers={setReloadUsers}/>}
        
        />

   
    );
}

function UserInactive(props) {

    const {user , setReloadUsers} = props ; 

    const [avatar , setAvatar] = useState(null) ; 
    
    useEffect (()=> {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response)
            })
        } else {
            setAvatar(null)
        }
    },[user]) ; 

    // funcion para activar usuarios 
const activateUser = () => {

    // obtenemos el token 
    const accessToken = getAccessTokenApi();
    activateUserApi(accessToken,user._id,true )
            .then(response => {
                notification['success']({
                    message: response.message
                });
                setReloadUsers(true);
            })
                .catch(err => {
                    notification['error']({
                        message: err.message
                    })
                })

}
// funcion para mostrar modal de confirmacion al eliminar usuario 
const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();

    confirm ({
        title:'Eliminando usuario',
        content:`¿Estas seguro que quieres eliminar a ${user.email}?`,
        okText: 'Eliminar',
        okType:'danger',
        cancelText:'Cancelar',
        onOk(){
            deleteUserApi(accessToken,user._id)
                    .then(response =>{
                        notification['success']({
                            message: 'El usuario se ha eliminado correctamente. '
                        });
                        //refrescamos la pagina 
                        setReloadUsers(true);
                    }).catch(err => {
                        notification['error']({
                            message:err
                        })
                    })
        }
    })
}

    return (
        <List.Item
                actions = {[
                    <Button
                            type = 'primary'
                            onClick = { activateUser}
                        ><CheckOutlined/>
                    </Button>, 
                     
                     <Button
                     type = 'danger'
                     onClick = { showDeleteConfirm }
                       ><DeleteOutlined />
                   </Button> 


                ]}
            >
                <List.Item.Meta
                    avatar = {<Avatar src= {avatar ? avatar : NoAvatar}/>}
                    title = {`
                        ${user.name ? user.name : "..."}
                        ${user.lastname ? user.lastname : "..."}
                    `}
                    description = {user.email}
                />

                
            </List.Item>

    )

}

}