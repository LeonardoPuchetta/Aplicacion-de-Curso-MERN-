import React from 'react';

import './PresentationCourses.scss';

import AcademyLogo from '../../../../assets/img/png/academy-logo.png';

export default function PresentationCourses() {
    return (
        <div className='presentation-courses'>
            <img src={AcademyLogo} alt='Cursos de Udemy'/>
            <p>
                En Udemy encontraras los mejores cursos online de desarrollo web en español .
            </p>
            <p>
                Aprovecha las ofertas !!!
            </p>
        </div>
    )
}
