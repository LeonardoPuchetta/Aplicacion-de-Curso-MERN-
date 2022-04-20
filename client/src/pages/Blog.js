import React from 'react';

import {Row,Col} from 'antd';

import {useParams} from 'react-router-dom';

import PostsListWeb from '../components/Web/Blog/PostsListWeb/PostsListWeb';
import PostInfo from '../components/Web/Blog/PostInfo/PostInfo';



export default function Blog(props) {

    console.log(props);

    //sacamos la url 
    const {url} = useParams() ;
    //sacamos history y location de los props 
    const {history,location } = props;

    return (
        <Row>
            <Col md={4}/>
            <Col md={16}>
                {url? (
                    <PostInfo url={url}/>
                ): <PostsListWeb history={history} location = {location}/>}
            </Col>
            <Col md={4}/>

        </Row>
    )
}
