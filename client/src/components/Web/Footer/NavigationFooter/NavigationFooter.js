import React from 'react';

import './NavigationFooter.scss';

import {Row,Col } from 'antd';
import {BookOutlined,CodepenOutlined,DatabaseOutlined,RightOutlined
,HddOutlined,AppstoreOutlined,UserOutlined}  from '@ant-design/icons';
import {Link} from 'react-router-dom';

export default function NavigationFooter() {
    return (
        <Row className='navigation-footer'>
            <Col md={24}>
                <h3>Navegación</h3>
            </Col>
            <Col md={12} className='navigation-footer__list'>
                <RenderListLeft/>
            </Col>
            <Col md={12} className='navigation-footer__list'>
                <RenderListRight/>
            </Col>
        </Row>
    )
}


function RenderListLeft(){

    return (
        <ul>
            <li>
                <a href='#'>
                <BookOutlined /> Cursos online
                </a>
            </li>
            <li>
                <a href='#'>
                    <CodepenOutlined/> Desarrollo Web
                </a>
            </li>
            <li>
                <a href='#'>
                    <DatabaseOutlined /> Base de datos
                </a>
            </li>
            <li>
                <a href='#'>
                    <RightOutlined /> Política de <br/>Privacidad
                </a>
            </li>

        </ul>
    )

}

function RenderListRight(){

    return (
        <ul>
            <li>
                <a href='#'>
                <HddOutlined /> Sistemas/servidores
                </a>
            </li>
            <li>
                <a href='#'>
                    <AppstoreOutlined /> CMS
                </a>
            </li>
            <li>
                <a href='#'>
                    <UserOutlined /> Portfolio
                </a>
            </li>
            <li>
                <a href='#'>
                    <RightOutlined /> Política de Cookies
                </a>
            </li>

        </ul>
    )

}