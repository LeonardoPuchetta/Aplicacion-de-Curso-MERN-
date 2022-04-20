import React , {useEffect,useState} from 'react';
import {Spin,List,notification} from 'antd';
import {Link} from 'react-router-dom';


//para manejo de fechas 
import moment from 'moment';

import queryString from 'query-string';
import Pagination from './../../../Pagination';
import {getPostApi, getPostsApi} from './../../../../api/post';
//para que todo lo 'moment' este en espanol
import 'moment/locale/es';



import './PostListsWeb.scss';

export default function PostsListWeb(props) {

const {history,location} =props;

//estado para guardar los posts
const [posts,setPosts] = useState(null);
//para saber en que pagina estamos
const {page =1} =queryString.parse(location.search);

//para obtener todos los posts
useEffect(() => {

  getPostsApi(12,page).then(response => {
      if(response?.code !== 200 ){
        notification['warning']({
            message: response.message
        })
      } else {
          setPosts(response.posts)
      }
  }).catch(() => {
      notification['error']({
          message: 'Error del servidor.'
      })
  })
}, [page]);


if (!posts){
    return (
        <Spin tip='Cargando' style={{width:"100%" , padding: "200px 0 "}}/>
    )
}

    return (
        <div className='post-list-web'>
            <h1>Blog</h1>
            <List dataSource={posts.docs} renderItem={post => <Post post={post}/>}/>
            <Pagination posts={posts} location={location} history={history}/>
        </div>
    )
}


function Post(props) {

const {post} = props;
//console.log(post);

//extraemos la fecha de publicacion
const day = moment(post.date).format("DD");
const month = moment(post.date).format("MMMM");



    return (
        <List.Item className='post'>
            <div className='post__date'>
                <span>{day}</span>
                <span>{month}</span>
            </div>
            
                <List.Item.Meta title={<Link to={`blog/${post.url}`}>{post.title} </Link>}/>

           
        </List.Item>
        )
}