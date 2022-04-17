import React from 'react'

import {Row,Col,Card,Avatar} from 'antd';

import './ReviewsCourses.scss';

import Avatar0 from '../../../assets/img/png/Avatar.png';
import Avatar1 from '../../../assets/img/png/Avatar1.png';
import Avatar2 from '../../../assets/img/png/Avatar2.png';
import Avatar3 from '../../../assets/img/png/Avatar3.png';
import Avatar4 from '../../../assets/img/png/Avatar4.png';


export default function ReviewsCourses() {
    return (
        <Row className='reviews-courses'>
            <Row>
                <Col lg={4}/>
                <Col lg={16} className='reviews-courses__title'>
                    <h2>Forma parte de los +35 mil estudiantes que estan aprendiendo con mis cursos</h2>
                </Col>
                <Col lg={4}/>
                
            </Row>
            <Row>
                <Col lg={4}/>
                <Col lg={16} className='reviews-courses__title'>
                   <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview 
                                name='Laura Lopetegui'
                                subtitle='Alumne de Udemy'
                                avatar={Avatar0}
                                review='Buen curso , explicaciones detalladas y clases bien estructuradas. Me falto aprender un 
                                poco mas de SCSS.'
                                />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name='Paola Carrizo'
                                subtitle='Alumne de Udemy'
                                avatar={Avatar1}
                                review='Excelente curso , logre crear mi propia aplicacion para vender buzones. Me falto aprender un 
                                poco mas de SCSS. '
                                />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name='Pablo Clavito'
                                subtitle='Alumne de Udemy'
                                avatar={Avatar2}
                                review='Buen curso , explicaciones detalladas y clases bien estructuradas. Me falto aprender un 
                                poco mas de SCSS.'
                                />
                        </Col>
                   </Row>
                   <Row className='row-cards'>
                        <Col md={8}>
                            <CardReview 
                                name='BatiUsuario'
                                subtitle='Alumne de Udemy'
                                avatar={Avatar3}
                                review='Buen curso , explicaciones detalladas y clases bien estructuradas. Me falto aprender un 
                                poco mas de SCSS.'
                                />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name='Carlos Kol'
                                subtitle='Alumne de Udemy'
                                avatar={Avatar4}
                                review='Excelente curso , logre crear mi propia aplicacion para vender buzones. Me falto aprender un 
                                poco mas de SCSS. '
                                />
                        </Col>
                        <Col md={8}>
                            <CardReview 
                                name='  Paula Pilino'
                                subtitle='Alumne de Udemy'
                                avatar={Avatar0}
                                review='Buen curso , explicaciones detalladas y clases bien estructuradas. Me falto aprender un 
                                poco mas de SCSS.'
                                />
                        </Col>
                   </Row>
                   
                </Col>
                <Col lg={4}/>
                
            </Row>
        </Row>
    )
}

function CardReview(props){

        const {name ,subtitle,avatar, review} = props ; 
        const {Meta} = Card ; 

        return(

            <Card className='reviews-courses__card'>
                <p>{review}</p>
                <Meta
                    avatar={<Avatar src={avatar}/>}
                    title={name}
                    description={subtitle}
                />
                
            </Card>
        )



}
