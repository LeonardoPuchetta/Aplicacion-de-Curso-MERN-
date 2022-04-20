import React from 'react';
import {Row,Col,Spin,notification} from 'antd';

import ContactCard from '../components/Web/ContactCard';


export default function Contact(){

    return (
        <Row>
        <Col md={4}/>
        <Col md={16}>
        

         <ContactCard/>


        
        </Col>
        <Col md={4}/>
    </Row>
    )

}