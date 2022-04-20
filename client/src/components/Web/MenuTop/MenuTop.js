import React, {useEffect,useState}from 'react';

import {Menu} from 'antd';

//para hacer la navegacion
import {Link} from 'react-router-dom'
import SocialLinks from './../SocialLinks';
import logo from '../../../assets/img/jpg/logo.JPG';
import {getMenuApi} from '../../../api/menu';


import './MenuTop.scss';

export default function MenuTop(){


    const [menuData,setMenuData] = useState([]);

    

    useEffect(() => {

        getMenuApi().then(response => {
            //array de menus activos
            const arrayMenu = [];
            response.menu.forEach(item => {
                // if(item.active){
                //     arrayMenu.push(item)
                // }
                item.active && arrayMenu.push(item);
            });
            setMenuData(arrayMenu);
        })
    },[])


    return (
        <Menu className='menu-top-web' mode="horizontal">

            <Menu.Item className='menu-top-web__logo'>
                <Link to = {'/'}>
                    <img src={logo} alt="Leonardo Puchetta"/>
                </Link>
            </Menu.Item>

            
            {menuData.map(item => {
                const external = item.url.indexOf("http") > -1 ? true : false ; 
                if (external) {
                    return (
                        <Menu.Item key ={item._id} className='menu-top-web-item'>
                            <a href={item.url} target='_blank' rel ='noopener noreferrer'> {item.title}</a>
                        </Menu.Item>
                    )
                }

                return (
                    <Menu.Item key ={item._id} className='menu-top-web-item'>
                        <Link to ={item.url}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )

            }) }

            {/* <Menu.Item className='menu-top-web__item'>
                <Link to = {'/'}>Inicio</Link>
            </Menu.Item>
            <Menu.Item className='menu-top-web__item'>
                <Link to = {'/contact'}>Contacto</Link>
            </Menu.Item> */}

           <SocialLinks/>
        </Menu>
    )
}