import React from 'react';
import {Row,Col,Card,Avatar} from 'antd';
import Avatar2 from './../../../assets/img/png/Avatar2.png';
import {GithubOutlined ,MailOutlined } from '@ant-design/icons';

import './ContactCard.scss'


export default function ContactCard() {
  return (
    <div className='card-div'>
           <Col md={8} className='card-item'>
                            <CardReview 
                                
                                name='Leonardo Puchetta'
                                subtitle=''
                                avatar={Avatar2}
                                review='leonardopuchetta21@gmail.com '
                                icon={<MailOutlined/>}
                                />
                                <div className='link-contact'>
                                    <button className='btn-contact'>
                                    <a href='https://github.com/LeonardoPuchetta/Aplicacion-de-Curso-MERN-.git' target='_blank'>
                                    <GithubOutlined spin='true' style={{ fontSize: '16px' }} className='icon'/>
                                    Repositorio en GitHub</a>
                                    </button>
                                </div>
                                
            </Col>
            
    </div>
  )
}
function CardReview(props){

    const {name ,subtitle,avatar, review,icon} = props ; 
    const {Meta} = Card ; 

    return(

        <Card className='reviews-courses__card-contact'>
            
            <Meta
                avatar={<Avatar src={avatar}/>}
                title={name}
                description={subtitle}
            />
            <div className='reviews-courses__card-info'>
            <p className='icon-contact'>{icon}</p>
            <p >{review}</p>
            </div>
            
        </Card>
    )



}