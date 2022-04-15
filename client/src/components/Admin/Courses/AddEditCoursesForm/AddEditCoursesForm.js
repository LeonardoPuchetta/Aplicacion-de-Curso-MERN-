import React ,{useState,useEffect} from 'react';
import {List ,Button ,Form, notification,Input} from 'antd';
import {EditOutlined,DeleteOutlined,ContainerOutlined,DollarCircleOutlined,LinkOutlined} from '@ant-design/icons';
import {getAccessTokenApi} from '../../../../api/auth';
import {addCourseApi,updateCourseApi} from '../../../../api/courses';


import './AddEditCoursesForm.scss';


export default function AddEditCoursesForm(props) {

    //"course" nos llegara solo cuando vayamos a editar un curso

    const {setIsVisibleModal,setReloadCourses,course} = props;

    const [courseData,setCourseData] = useState({});

    //debemos recoger los datos de course para el caso 
    //de editar un cursos que ya existen 
    useEffect(() => {
       //si course existe 
    course ?  setCourseData(course) : setCourseData({});
        
    }, [course]);

    //funcion quye agrega cursos 
    const addCourse = e => {
                //validamos los input 
                if(!courseData.idCourse){
                    notification['warning']({
                        message:'El id del curso es obligatorio.'
                    })
                } else {

                    //recuperamos el token 
                    const accessToken = getAccessTokenApi();
                    addCourseApi(accessToken,courseData)
                                .then( response => {
                                    const typeNotification = response.code === 200 ? "success":"warning";
                                    notification[typeNotification]({
                                    message: response.message
                                    });
                                    setIsVisibleModal(false);
                                    setReloadCourses(true);
                                    setCourseData({});
                        }
                        
                        ).catch (() => {
                            notification['error']({
                                message:'Error del servidor , intentelo mas tarde.'
                            })
                        })
                }
    }

    //funcion que edita cursos
    const updateCourse = e => {
        
        const accessToken=getAccessTokenApi();

        updateCourseApi(accessToken,course._id,courseData).then(
            response => {
                const typeNotification= response.code ===200 ? "success":"warning";
                notification[typeNotification]({
                    message: response.message
                });
                setIsVisibleModal(false);
                setReloadCourses(true);
                setCourseData({})

            }
        ).catch(
            () => {
                notification['error']({
                    message:"Error del servidor , intentelo mas tarde."
                })
            }
        )


    }

    return (
        <div className='add-edit-course-form'>
            <AddEditForm
            course={course}
            addCourse={addCourse}
            updateCourse={updateCourse}
            setCourseData={setCourseData}
            courseData={courseData}
            
            
            />
        </div>
    )
}


function AddEditForm(props){

    const {course,
        addCourse,
        updateCourse,
        setCourseData,
        courseData} =     props ; 
    

    return (
    <Form className='form-add-edit' >
        <Form.Item>
            <Input
                prefix={<EditOutlined/>}
                placeholder="ID del curso"
                value={courseData.idCourse}
                onChange={ e => 
                        setCourseData({...courseData , idCourse: e.target.value})}
                disabled={ course ? true : false}
            />


        </Form.Item>
        
        <Form.Item>
            <Input
                prefix={<LinkOutlined />}
                placeholder="Url del curso"
                value={courseData.link}
                onChange={ e => 
                    setCourseData({...courseData , link: e.target.value})}
                //disabled={ course ? true : false}
            />


        </Form.Item>
        <Form.Item>
            <Input
                prefix={<ContainerOutlined />}
                placeholder="Cupon de descuento"
                value={courseData.coupon}
                onChange={ e => 
                    setCourseData({...courseData , coupon: e.target.value})}
                //disabled={ course ? true : false}
            />


        </Form.Item>
        <Form.Item>
            <Input
               prefix={<DollarCircleOutlined />}
                placeholder="Precio del curso"
                value={courseData.price}
                onChange={ e => 
                    setCourseData({...courseData , price: e.target.value})}
                //disabled={ course ? true : false}
            />


        </Form.Item>
        <Form.Item>
                <Button type='primary' className='btn-submit' htmlType='submit' 
                            onClick={course ? updateCourse:addCourse}>
                    {course ? 'Actualizar curso' : 'Crear curso'}
                </Button>
        </Form.Item>

    </Form>)
}