import React from 'react';
import {Row,Col,Card,Avatar} from 'antd';
import NoAvatar from './../../../assets/img/png/no-avatar.png';
import {GithubOutlined ,MehOutlined } from '@ant-design/icons';
import './ErrorCard.scss';


export default function ErrorCard() {
  return (
    <div className='card-div'>
           <Col md={8} className='card-item'>
                            <CardReview 
                                
                                name='Error 404'
                                subtitle=''
                                avatar={NoAvatar}
                               
                                icon={<MehOutlined />}
                                aviso='La url ingresada no es valida'
                                />
                               
                                
            </Col>
            
    </div>
  )
}

function CardReview(props){

    const {name ,subtitle,avatar,icon,aviso} = props ; 
    const {Meta} = Card ; 

    return(

        <Card className='error__card'>
            <div>
            <Meta
                avatar={<Avatar src={avatar}/>}
                title={name}
                description={subtitle}
            />
            </div>
            <div className='error__card-info'>
            <p >{icon}</p>
            
            <p >{aviso}</p>
            </div>
            
        </Card>
    )



}
