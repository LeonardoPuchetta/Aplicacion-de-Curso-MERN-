import React from 'react';
import {Row,Col,Spin,notification} from 'antd';

import ErrorCard from '../components/Web/ErrorCard/ErrorCard';

export default function Error404() {
  return (
    <Row>
        <Col md={4}/>
        <Col md={16}>
        

         <ErrorCard/>


        
        </Col>
        <Col md={4}/>
    </Row>
  )
}
