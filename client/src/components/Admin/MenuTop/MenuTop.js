import React from 'react';
//importacion de Button de antd 
import { SmileOutlined ,  MenuFoldOutlined , PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
//importacion del logo 
import LeoLogo from '../../../assets/img/jpg/logo.JPG';
import './MenuTop.scss';

// importacion de funcion de desconexion 
import {logout} from '../../../api/auth' ; 


export default function MenuTop(props) {

const {menuCollapsed , setMenuCollapsed} = props;

const logoutUser =  () => {
    logout();
    // y hacemos una recarga de la pagina 
    window.location.reload();
}

return (
    <div className="menu-top">
        <div className = 'menu-top__left'>

            <img className = 'menu-top__left-logo'
            src={LeoLogo} 
            alt='Leonardo'
            />
            <Button type='link' onClick={()=> setMenuCollapsed(!menuCollapsed)}>
                < MenuFoldOutlined type = {menuCollapsed ? 'close' : "menu-fold"} style = {{ color : 'white' }}/>
            </Button>
        </div>

        <div className = 'menu-top__right'>
            <Button type='link'onClick={logoutUser}>
                <PoweroffOutlined  type ="poweroff" style = {{ color : 'white' }}/>
            </Button>
        </div>
    </div>
)
}