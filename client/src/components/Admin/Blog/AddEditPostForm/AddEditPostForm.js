import React , {useState,useEffect}from 'react';
import {Row,Col,Form,Input,notification,DatePicker, Button,} from 'antd';
import {FontSizeOutlined ,LinkOutlined} from '@ant-design/icons';

//importacion de moment 
import moment from 'moment';
//importacion del editor 
import {Editor} from '@tinymce/tinymce-react';

import {getAccessTokenApi} from './../../../../api/auth';
import {addPostApi,updatePostApi} from './../../../../api/post';


import './AddEditPostForm.scss';

export default function AddEditPostForm(props) {

    const {setIsVisibleModal,setReloadPosts,post} = props;
    //estado para guardar datos de post 
    const [postData,setPostData] = useState({});

    //efecto para actualizar datos de post
    useEffect(() => {
       if(post){
           setPostData(post);
           

       } else {
           setPostData({});
       }
    }, [post]);

    //funcion para decidir si crear o modificar post 
    const processPost = e =>{
 
        e.preventDefault();

        const {title,url,description,date} =  postData;

        if (!title || !url || !description ||!date ){
            notification['error']({
                message:'Todos los campos son obligatorios.'
            })

        } else {
            if(!post) {
                addPost();
            } else {
                updatePost();
    
            }
        }

    } 


    const addPost = () => {

            const token = getAccessTokenApi();

            addPostApi(token,postData)
            
            .then(response => {
                const typeNotification = response.code === 200 ? "success" : "warning";
                    notification[typeNotification]({
                        message: response.message
                    });
                setPostData({});
                setIsVisibleModal(false);
                setReloadPosts(true);
                
            })
            .catch(() => {
                
                notification['error']({
                    message:'Error del servidor.'
                })
            }

            )
    }

    const updatePost = () => {
        const token = getAccessTokenApi();
        updatePostApi(token,post._id,postData)
            .then(response => {
                const typeNotification=response.code ===200 ? 'success':'warning';
                notification[typeNotification]({
                    message: response.message
                });
                setPostData({});
                setIsVisibleModal(false);
                setReloadPosts(true);
            }).catch(()=> {
                notification['error']({
                    message:'Error del servidor.'
                })
            })

    }



    return (
        <div className='add-edit-post-form'>
            <AddEditForm postData={postData} setPostData={setPostData}
             post={post} processPost={processPost}/>
        </div>
    )
}


function AddEditForm(props) {

    const {post,postData,setPostData,processPost}= props;

    return (
        <Form className='add-edit-post-form'
                layout ='inline'
                onSubmit = {processPost}
        >
                <Row gutter={24}>
                    <Col span={8}>
                        <Input
                            prefix={<FontSizeOutlined />}
                            placeholder='Titulo'
                            value={postData.title}
                            onChange={e =>setPostData({...postData, title:e.target.value})}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            prefix={<LinkOutlined />}
                            placeholder='url'
                            value={postData.url}
                            onChange={e =>setPostData({...postData, url:transformTextToUrl(e.target.value)})}
                        />
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            style={{width:'100%'}}
                            format="DD/MM/YYYY HH:mm:ss"
                            placeholder='Fecha de publicacion'
                            value={postData.date && moment(postData.date)}
                            onChange={(e,value) =>setPostData({
                                ...postData, 
                                date:moment(value,"DD/MM/YYYY HH:mm:ss").toISOString()
                            })}
                            //showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                        />
                    </Col>
                </Row>
                <Editor
                    initialValue={postData.description ? postData.description:""}
                    init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                   
                    }}
                    onBlur={e => { setPostData({...postData, description: e.target.getContent()})}}
                 
                 />
                 <Button type='primary' htmlType='submit' className='btn-submit' onClick={processPost}>
                     {post? 'Actualizar post' : 'Crear post'}
                 </Button>

        </Form>
    )
}


function transformTextToUrl(text){

const url = text.replace(" ","-");

return url.toLowerCase();

}

