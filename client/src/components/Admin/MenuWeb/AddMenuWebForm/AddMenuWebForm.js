import React,{useState} from 'react';

import {Switch , List , Modal as ModalAntd , notification , Button , Select,Input ,Form } from 'antd' ; 
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
// para finalizar posteo del nuevo menu 
import {addMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';


import './AddMenuWebForm.scss';


export default function AddMenuWebForm(props){

 const {setIsVisibleModal,setReloadMenuWeb} = props;
 //estado para guardar datos del menu 
 const [menuWebData,setMenuWebData] = useState({});


 const addMenu = event =>{
     //event.preventDefault();
     let finalData = {
         title : menuWebData.title,
         url : (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url 
     } ;
     // validacion de datos del formulario 
     if (!finalData.title || !finalData.url|| !menuWebData.url ){
        notification['error']({message: 'Todos los campos son obligatorios.'})
     } else {
         const accessToken= getAccessTokenApi();
         finalData.active = false ; 
         //para que se vaya al final de la cola 
         finalData.order = 1000
         //finalmente hacemos el post en la base 
         addMenuApi(accessToken , finalData)
          /*   .then(response => {
                    notification['success']({
                        message :response
                    });
                    //limpiamos el formulario
                    setIsVisibleModal(false) ;
                    setReloadMenuWeb(true);
                    setMenuWebData({});
                    finalData ={};
                })
                        .catch(() => {
                            notification['error']({
                                message: "Error en el servidor."
                            })
                        }
                        )*/
                       notification['success']({
                            message :'Menu creado correctamente .'
                        });
                        //limpiamos el formulario
                        setIsVisibleModal(false) ;
                        setReloadMenuWeb(true);
                        setMenuWebData({});
                        finalData ={};
     }

 }



return (
    <div className='add-menu-web-form'>
     <AddForm 
       menuWebData ={menuWebData} 
       setMenuWebData = {setMenuWebData}
       addMenu = {addMenu}/>
    </div>
);

}

function AddForm (props) {

const {menuWebData ,setMenuWebData,addMenu} = props;

const {Option} = Select; 

const selectBefore = (

    <Select
        defaultValue='http://'
        style={{width : 90}}
        onChange={e =>setMenuWebData({...menuWebData , http: e })}
        >
                <Option value = 'http://'>
                    http://
                </Option>
                <Option value = 'https://'>
                    https://
                </Option>
    </Select>
)

return (

    <Form className='form-add' onFinish = {addMenu}>
        <Form.Item>
            <Input
            prefix= {<EditOutlined/>}
            placeholder='Titulo'
            value={menuWebData.title} 
            onChange = {e =>setMenuWebData({...menuWebData , title: e.target.value })}
            />
        </Form.Item>
        <Form.Item>
            <Input
            addonBefore={selectBefore}
            placeholder= 'URL'
            value={menuWebData.url} 
            onChange = {e =>setMenuWebData({...menuWebData , url: e.target.value })}
            />
        </Form.Item>
        <Form.Item>
            <Button type='primary' htmlType='submit' className='btn-submit'>
                Crear menú
            </Button>
        </Form.Item>

    </Form>
);
}