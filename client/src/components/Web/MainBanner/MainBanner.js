import React from 'react';

import {Row,Col} from 'antd';

import './MainBanner.scss';


export default function MainBanner(){


    return (
        <div className='main-banner'>
            <div className='main-banner__dark'>

            <Row>
            <Col lg={4}>
                    
            </Col>
            <Col lg={16}>
                    <h2>Aprende nuevas <br/>tecnologias web y movil</h2>
                    <h3>
                        A traves de cursos practicos , concisos y actualizados creados por <br/>
                        profesionales con experiencia.
                    </h3>
            </Col>
            <Col lg={4}>
                    
            </Col>
            </Row>


            </div>
        </div>
    )
}