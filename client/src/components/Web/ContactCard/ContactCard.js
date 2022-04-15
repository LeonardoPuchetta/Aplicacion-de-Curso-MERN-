import React from 'react';
import {Row,Col,Card,Avatar} from 'antd';
import Avatar2 from './../../../assets/img/png/Avatar2.png';

import './ContactCard.scss'


export default function ContactCard() {
  return (
    <div className='card-column'>
           <Col md={8} className='card-item'>
                            <CardReview 
                                
                                name='Leonardo Puchetta'
                                subtitle=''
                                avatar={Avatar2}
                                review='leonardopuchetta21@gmail.com '
                                />
            </Col>
    </div>
  )
}
function CardReview(props){

    const {name ,subtitle,avatar, review} = props ; 
    const {Meta} = Card ; 

    return(

        <Card className='reviews-courses__card'>
            
            <Meta
                avatar={<Avatar src={avatar}/>}
                title={name}
                description={subtitle}
            />
            <p>{review}</p>
            
        </Card>
    )



}