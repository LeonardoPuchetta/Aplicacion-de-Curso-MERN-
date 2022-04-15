import React ,{useState ,useEffect } from 'react';
import {notification , Button} from 'antd';
import Modal from './../../../components/Modal';

//para paginacion 
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';

import PostsList from './../../../components/Admin/Blog/PostsList';
import Pagination from './../../../components/Pagination';
import AddEditPostForm from './../../../components/Admin/Blog/AddEditPostForm';
import { getPostsApi } from '../../../api/post';

import './Blog.scss';

function Blog(props) {

    const {location,history} = props ;

    const [modalTitle, setModalTitle] = useState("");
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalContent,setModalContent] = useState(null);

    //estado para guardar posts 
    const [posts,setPosts]=useState(null);
    //estado para forzar la recarga 
    const [reloadPosts,setReloadPosts ] = useState(false);

    //variable para obtener la page 
    const {page = 1} = queryString.parse(location.search);

    //peticion para obtener datos del post 
    //cada vez que se actualize page 
    useEffect(() => {
        getPostsApi(12,page).then(response => {
            if(response?.code !==200){
                notification['warning']({
                    message:response.message
                })
            } else {
                setPosts(response.posts);
                
            }
        }).catch(()=>{
            notification['error']({
                message:'Error del servidor.'
            })
        });
        setReloadPosts(false);
    }, [page,reloadPosts]);

    //para nuevo post 
    const addPost = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando nuevo post');
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPosts={setReloadPosts}
                post={null}
            />)
    }

    //para editar post 
    const editPost = post => {
        setIsVisibleModal(true);
        setModalTitle('Editar post');
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadPosts={setReloadPosts}
                post={post}
            />)
    }


    //validacion 
    if (!posts){
        return null
    }

    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary' onClick={addPost}>
                    Nuevo post
                </Button>
            </div>
                <PostsList posts={posts} setReloadPosts={setReloadPosts} editPost={editPost}/>
                <Pagination posts={posts} location={location} history={history}/>
                <Modal
                    title={modalTitle}
                    isVisible={isVisibleModal}
                    setIsVisible={setIsVisibleModal}
                    width='75%'    
                >
                    {modalContent}

                </Modal>
        </div>
    )
}

export default withRouter(Blog);
