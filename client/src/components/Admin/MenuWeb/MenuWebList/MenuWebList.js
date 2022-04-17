import React , {useState , useEffect }from 'react';

import {Switch , List , Modal as ModalAntd , notification , Button } from 'antd' ; 
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import {updateMenuApi , activateMenuApi ,deleteMenuApi} from '../../../../api/menu';
import {getAccessTokenApi} from '../../../../api/auth';

import EditMenuWebForm from '../EditMenuWebForm';


import AddMenuWebForm from '../AddMenuWebForm'


import './MenuWebList.scss';


const {confirm} = ModalAntd ;

export default function MenuWebList(props) {

    //estados para utilizar en el componente
    const { menu , setReloadMenuWeb } = props ;

    //estado para guardar la nueva version del menu 
    const [listItems ,setListItems] = useState([]);

    const [isVisibleModal , setIsVisibleModal] = useState(false); 

    const [modalTitle, setModalTitle] =useState('');

    const [modalContent , setModalContent] = useState(null);


    // se ejecutara cuando actualice el menu 
    useEffect(()=>{
        const listItemsArray =[];
        //recorremos el array menu y agregamos la info en el array listItemsArray
        menu.forEach(item => {
            listItemsArray.push({
                content:(
                <MenuItem 
                item = {item} 
                activateMenu= {activateMenu} 
                editMenuWebModal={editMenuWebModal}
                deleteMenu={deleteMenu}
                />)
            })
        });
        setListItems(listItemsArray);

    },[menu]);

    //funcion que se ejecuta cada vez que reordenamos la lista
    const onSort = (sortedList,dropEvent) => { 
        //precisamos el token para actualizar en la base 
        const accessToken = getAccessTokenApi();
         //recogemos el array que devuelve el sortedList
       sortedList.forEach(item => {
           // por cada iteracion ...
           const {_id} = item.content.props.item;
           const order = item.rank ;
           //llamamos a la funcion de updateMenuApi
            updateMenuApi(accessToken,_id,{order});
       })  

    };

    //funcion para activar/desactivar menu 
    const activateMenu = (menu,status) => {

        const accessToken = getAccessTokenApi();

        activateMenuApi(accessToken,menu._id ,status)
                .then (response => {
                    notification ["success"]({
                        message: response 
                    })
                })
    };

    //funcion para eliminar menu 
    const deleteMenu = menu =>{

        const accessToken = getAccessTokenApi();

        //usamos el confirm de antd 
        confirm({
            title:'Eliminando menú',
            content: `¿Esta seguro que quieres eliminar el menú ${menu.title}?`,
            okText:'Eliminar',
            okType:'danger',
            cancelText:'Cancelar',
            //funcion para cuando clickean okText
            onOk(){
                deleteMenuApi(accessToken,menu._id).then( response =>{
                    notification['success']({
                        message: 'Menú eliminado correctamente.'
                    });
                    setReloadMenuWeb(true);

                }

                ).catch(() => {
                    notification['error']({
                        message: 'Error del servidor,intentelo mas tarde.'
                    });
                })
            }
        })

    };

    //funcion para editar menus ya existentes 
    const editMenuWebModal = (menu) =>{

        setIsVisibleModal(true);
        setModalTitle(`Editando menú : ${menu.title}`);
        setModalContent(
            <EditMenuWebForm 
                    setIsVisibleModal= {setIsVisibleModal}
                    setReloadMenuWeb={setReloadMenuWeb}
                    menu = {menu}
                    />
        )
    }

        //funcion para crear nuevo menu 
    const addMenuWebModal = () => {
            setIsVisibleModal(true);
            setModalTitle('Creando nuevo menú');
            setModalContent(
               <AddMenuWebForm
                    setIsVisibleModal= {setIsVisibleModal}
                    setReloadMenuWeb={setReloadMenuWeb}
                />
            )
        }
  

    return (
        <div className= 'menu-web-list'>
            <div className='menu-web-list__header'>
                <Button type='primary' onClick={addMenuWebModal}>
                    Crear menú
                </Button>
            </div>

            <div className='menu-web-list__items'>
                <DragSortableList items ={listItems} onSort = {onSort} type = 'vertical'/>
            </div>

             <Modal
                title = {modalTitle}
                isVisible={isVisibleModal}
                setIsVisible = {setIsVisibleModal}
            >
                {modalContent}
                
            </Modal>
        
        </div>
    )
}

// creamos un componente que representa un menu de la lista 
function MenuItem(props){

    const {item , activateMenu ,editMenuWebModal , deleteMenu} =props ; 

    return (
            <List.Item
                actions= {[
                    <Switch defaultChecked = {item.active} 
                            onChange = {e => activateMenu(item, e )}/> ,
                    <Button type='primary' onClick={() => editMenuWebModal(item)}>
                        <EditOutlined/>
                    </Button>,
                     <Button type='danger' onClick={() => deleteMenu(item)} >
                        <DeleteOutlined/>
                    </Button>

                ]}
            >
                <List.Item.Meta title = {item.title} description = {item.url}/>
            </List.Item>
    )
}