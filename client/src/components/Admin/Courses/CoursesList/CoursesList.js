import React , {useState ,useEffect} from 'react';
import {List ,Button ,Modal as ModalAntd , notification} from 'antd';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
//para ordenar cursos 
import DragSortableList from 'react-drag-sortable';
//nuestro Modal
import Modal from '../../../Modal';
import {getCourseDataUdemyApi ,deleteCourseApi, updateCourseApi} from './../../../../api/courses' ;
import {getAccessTokenApi} from './../../../../api/auth';

import AddEditCoursesForm from './../AddEditCoursesForm';


import './CoursesList.scss';

//sacamos el Modal de confirmacion 
const {confirm} = ModalAntd;




export default function CoursesList(props) {


    const {courses , setReloadCourses} = props ;
    const [listCourses,setListCourses] = useState([]);
    const [isVisibleModal,setIsVisibleModal] = useState(false);
    const [modalContent,setModalContent] =useState(null);
    const [modalTitle,setModalTitle] = useState("");


    useEffect(() => {
        const listCourseArray = [];
        //construccion del array
        courses.forEach(course => {
            listCourseArray.push({
                content:(
                <Course
                    course = {course}
                    deleteCourse={deleteCourse}
                    editCourseModal={editCourseModal}

                />
                )
            })
        });
        //listCourses = listCourseArray
        setListCourses(listCourseArray);
    }, [courses]);

    const onSort = (sortedList , dropEvent) =>{
        const accessToken = getAccessTokenApi();
        console.log(sortedList);
        
        sortedList.forEach(item =>{
            //id de la base de datos
            const {_id} = item.content.props.course;
            const order = item.rank;
            //solo modifica el order del curso 
            updateCourseApi(accessToken,_id,{order});


        })
            

    };

// modal para agregar cursos
    const addCourseModal = () => {

        setIsVisibleModal(true);
        setModalTitle('Creando nuevo curso');
        setModalContent(
                <AddEditCoursesForm
                    setIsVisibleModal={setIsVisibleModal}
                    setReloadCourses={setReloadCourses}
                />);

    }

    // modal para actualizar cursos
    const editCourseModal = course => {

        setIsVisibleModal(true);
        setModalTitle('Actualizando curso');
        setModalContent(
                <AddEditCoursesForm
                    setIsVisibleModal={setIsVisibleModal}
                    setReloadCourses={setReloadCourses}
                    course={course}
                />);

    }

    const deleteCourse = course => {
        //obtenemos token 
        console.log(course._id);
        const accessToken = getAccessTokenApi();
        
        //mostramos confirmacion de borrado de ModalAntd
        confirm ({
            title:'Eliminando curso',
            content: `¿Esta seguro que quieres eliminar el curso ${course.idCourse}?`,
            okText:'Eliminar',
            okType:'danger',
            cancelText:'Cancelar',
            onOk(){
                //le pasamos el id DEL DOCUMENTO en la BASE ! 
                deleteCourseApi(accessToken,course._id)
                        .then(response => {
                            
                            const typeNotification = response.code === 200 ? "success": "warning";
                            notification[typeNotification]({
                                    message: response.message
                            });
                            //refrescamos la lista 
                            setReloadCourses(true);
                        }).catch (()=> {
                            notification["error"]({
                                message:'Error del servidor,intentelo mas tarde.'
                            })
                        })
 
            }

        })
    };

  

    return (
        <div className='courses-list'>
            <div className='courses-list__header'>
                <Button type='primary' onClick={addCourseModal}>
                    Nuevo curso
                </Button>

            </div>
            <div className='courses-list__items'>
                {listCourses.length === 0 && (
                    <h2 style={{textAlign:'center' , margin: 0 }}>
                        No tienes cursos creados.
                    </h2>
                )}
                <DragSortableList items={listCourses} onSort={onSort} type='vertical'/>
            </div>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
            
        </div>
    )
}


// funcion componente para hacer el  listCourseArray.push() en el forEach
//el componnete que aparece en pantalla

function Course(props){

    const {course , deleteCourse ,editCourseModal} = props ;
    //para guardar info del curso que llega de Udemy 
    const [courseData ,setCourseData] = useState(null) 

    useEffect(() => {
        
       getCourseDataUdemyApi(course.idCourse).then( response => {
           if (response.code !== 200){
               
               notification ['warning'] ({
                    message:`El curso con el id ${course.idCourse} no se ha encontrado.`
               });
           }
           //courseData = response.data
           setCourseData(response.data);
       }

       )

    }, [course]);
 

    if (!courseData){
        return null;
    }
 
    return (
        <List.Item 
            actions= {[
                <Button type='primary' onClick={() => editCourseModal(course)}>
                        <EditOutlined/>
                </Button>,
                 <Button type='danger' onClick={() => deleteCourse(course)}>
                 <DeleteOutlined/>
                </Button>
            ]}
        >
            <img 
                    src = {courseData.image_480x270} 
                    alt={courseData.title} 
                    style={{width:'100px' , marginRight:'20px'}}/>

            <List.Item.Meta
                title={`${courseData.title} | ID: ${course.idCourse} `}
                description={courseData.headline}
            />

            


        </List.Item>
    )
}