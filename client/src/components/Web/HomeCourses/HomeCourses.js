

import React from 'react';
import {Link} from 'react-router-dom';

//importacion de miniaturas de los cursos 

import reactJsHooks from './../../../assets/img/jpg/react-js-hooks.jpg';
import   reactNative from './../../../assets/img/jpg/react-native.jpg';

import   javaScript from './../../../assets/img/jpg/javascript-es6.jpg';
import   wordPress from './../../../assets/img/jpg/wordpress.jpg';
import   cssGrid from './../../../assets/img/jpg/css-grid.jpg';
import   prestaShop from './../../../assets/img/jpg/prestashop-1-7.jpg';

import './HomeCourses.scss';


import {Row ,Col ,Button ,Card } from 'antd';

export default function HomeCourses() {
    return (
       <Row className='home-courses'>
           <Col lg={24} className='home-courses__title'>
               <h2>Aprende y mejora tus habilidades</h2>
           </Col>

           <Col lg={4}/>
           <Col lg={16}>
                <Row className='row-courses'>
                    <Col md={6}>
                    <CardCourses image={reactJsHooks} 
                                    title='React JS Hooks'
                                    subtitle="Intermedio - React/JavaScript"
                                    link="https://www.udemy.com/course/master-en-javascript-aprender-js-jquery-angular-nodejs-y-mas/"
                                    />
                    </Col>
                    <Col md={6}>
                    <CardCourses image={wordPress} 
                                    title='WordPress'
                                    subtitle="Basico - 
                                    WordPress"
                                    link="https://www.udemy.com/course/master-en-javascript-aprender-js-jquery-angular-nodejs-y-mas/"
                                    />
                    </Col>
                    
                    <Col md={6}>
                    <CardCourses image={javaScript} 
                                    title='JavaScript ES-6'
                                    subtitle="Basico - 
                                    JavaScript                         "
                                    link="https://www.udemy.com/course/master-en-javascript-aprender-js-jquery-angular-nodejs-y-mas/"
                                    />
                    </Col>
                    <Col md={6}>
                        <CardCourses image={reactNative}
                        title='React JS Native'
                        subtitle="Intermedio - React/JavaScript"
                        link="https://www.udemy.com/course/master-en-javascript-aprender-js-jquery-angular-nodejs-y-mas/"
                        />
                    </Col>  
                </Row>
                <Row className='row-courses'>
                <Col md={6}>
                    <CardCourses image={cssGrid} 
                                    title='CSS'
                                    subtitle="Intermedio - CSS"
                                    link="https://www.udemy.com/course/master-en-javascript-aprender-js-jquery-angular-nodejs-y-mas/"
                                    />
                    </Col>
                    <Col md={6}/>
                    <Col md={6}/>
                    <Col md={6}>
                    <CardCourses image={prestaShop} 
                                    title='PrestaShop 1.7'
                                    subtitle="Basico - PrestaShop"
                                    link="https://www.udemy.com/course/master-en-javascript-aprender-js-jquery-angular-nodejs-y-mas/"
                                    />
                    </Col>
                </Row>
           </Col>
           <Col lg={4}/>
           <Col lg={24} className='home-courses__more'>
               <Link to='/courses'>
                   <Button>Ver mas</Button>
               </Link>

           </Col>
       </Row>
    )
}


function CardCourses(props){

    const {image ,title,subtitle , link} = props ;
    //de antd
    const {Meta} = Card ;

        return (
            <a href={link} target='_blank' rel = 'noopener noreferrer'>
                <Card
                    className='row-courses__card'
                    cover={<img src = {image} alt ={title}/>}
                    actions={[<Button>INGRESAR</Button>]}
                    >
                        <Meta title={title} description={subtitle}/>
               
                </Card>
            </a>
        )


}
