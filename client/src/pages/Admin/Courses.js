import React , {useState , useEffect }from 'react';

import CoursesList from './../../components/Admin/Courses/CoursesList';
//importamos funcion que conecta con el endpoint
import {getCoursesApi} from '../../api/courses' ;




export default function Courses(){

    //creamos nuevo estado para guardar cursos 
    // y otro para recargar lista de cursos 
    const [courses , setCourses] = useState([])  ;
    const [reloadCourses , setReloadCourses] = useState (false) ;

    //efecto que obtiene cursos de la base 
    useEffect(() => {
        getCoursesApi().then( response => {
            setCourses(response.courses);
        });

        setReloadCourses(false)
    }, [reloadCourses])


    return (
        <div className='courses'>
            <CoursesList courses={courses} setReloadCourses={setReloadCourses}/>
        </div>
    )
}