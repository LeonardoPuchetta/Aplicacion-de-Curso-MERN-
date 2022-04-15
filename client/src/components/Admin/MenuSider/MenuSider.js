import React from 'react';
import {Link , withRouter} from 'react-router-dom';
import {Menu , Layout } from 'antd';
import {HomeFilled , DatabaseFilled ,UserOutlined , BarsOutlined , 
    BookOutlined ,MessageOutlined} from '@ant-design/icons';
import './MenuSider.scss';

function MenuSider(props){
//--------------------------------------------------------------------///


    const {Sider} = Layout ; 
    const {menuCollapsed ,location} = props;

    return (
        <Sider className='admin-sider' collapsed ={menuCollapsed} >
            <Menu theme='dark' mode= 'inline' defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key = '/admin'className='item-sider'>
                    <Link to={'/admin'}>
                        <HomeFilled type='home'/>
                        <span className='nav-text'>Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = '/admin/users'className='item-sider'>
                    <Link to={'/admin/users'}>
                        <UserOutlined   type='user'/>
                        <span className='nac-text'>Usuarios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = '/admin/menu'className='item-sider'>
                    <Link to={'/admin/menu'}>
                        <BarsOutlined   type='menu'/>
                        <span className='nac-text'>Menú</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = '/admin/courses'className='item-sider'>
                    <Link to={'/admin/courses'}>
                        <BookOutlined  type='book'/>
                        <span className='nac-text'>Cursos</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key = '/admin/blog'className='item-sider'>
                    <Link to={'/admin/blog'}>
                        <MessageOutlined  type='book'/>
                        <span className='nac-text'>Blog</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(MenuSider);