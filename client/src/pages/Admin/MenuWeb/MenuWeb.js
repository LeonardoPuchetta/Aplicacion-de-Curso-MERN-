import React , {useState,useEffect} from 'react';
import {getMenuApi} from './../../../api/menu';

import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList/MenuWebList';

export default function MenuWeb() {

//creamos estado para guardar el menu obtenido de la base 
const [menu,setMenu] = useState([]);

//creamos estado para recargar la info de los menus cuando se actualizen
const [reloadMenuWeb , setReloadMenuWeb] = useState(false);

//efecto para observar los cambios en el menu sin recargar la pagina  
useEffect(()=> {

    getMenuApi()
        .then(
            response => {
                
                setMenu(response.menu);
                
            }
    )
    setReloadMenuWeb(false);

},[reloadMenuWeb]);

return (
    <div className='menu-web'>
           <MenuWebList menu = {menu} setReloadMenuWeb={setReloadMenuWeb}/>
    </div>
)


}