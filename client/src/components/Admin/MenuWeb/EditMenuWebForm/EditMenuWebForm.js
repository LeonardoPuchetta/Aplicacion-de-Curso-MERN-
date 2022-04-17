
import React , {useState , useEffect} from 'react';

import {Switch , List , Modal as ModalAntd , notification , Button , Select,Input ,Form } from 'antd' ; 
import {EditOutlined,DeleteOutlined,FontSizeOutlined,LinkOutlined} from '@ant-design/icons';

import {updateMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';


import './EditMenuWebForm.scss';

export default function EditMenuWebForm(props){

const {setIsVisibleModal , setReloadMenuWeb , menu} = props ; 

//estado para guardar datos del menu que estamos actualizando 
const [menuWebData, setMenuWebData] = useState({}); 

//efecto que actualiza menuWebData
useEffect(()=>{

    setMenuWebData(menu);

},[menu]);

//funcion que edita el menu 
const editMenu = event =>{

    if (!menuWebData.title || !menuWebData.url){
        notification['error']({
            message: 'Todos los campos son obligatorios.'
        });
        setReloadMenuWeb(true);

    } else {
        const accessToken = getAccessTokenApi();
        updateMenuApi(accessToken,menuWebData._id,menuWebData)
            .then(response =>{
                notification['success']({
                    message: 'Menú actualizado correctamente.'
                }) ;
                setIsVisibleModal(false);
                setReloadMenuWeb(true);

            })
                .catch(()=> {
                    notification['error']({
                        message: 'Error del servidor , intentelo mas tarde.'
                    }) 
                })
    }

}




return (

        <div className='edit-menu-web-form'>
            <EditForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu={editMenu}
            />
        </div>

)

}

function EditForm(props) {

    const {menuWebData , setMenuWebData , editMenu  } = props ;

    return (
        <Form className='form-edit' onFinish={editMenu}>
            <Form.Item>
                <Input
                    prefix={<FontSizeOutlined/>}
                    placeholder='Titulo'
                    value={menuWebData.title}
                    onChange={ e => setMenuWebData({...menuWebData , title: e.target.value})}
                />
              
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LinkOutlined/>}
                    placeholder='URL'
                    value={menuWebData.url}
                    onChange={ e => setMenuWebData({...menuWebData , url: e.target.value})}
                />
              
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'  >
                    Actualizar menú
                </Button>
            </Form.Item>


        </Form>
    )


}
