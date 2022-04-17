import React from 'react';

import './MyInfo.scss';
import Logo from './../../../../assets/img/jpg/logo.JPG';
import SocialLinks from '../../SocialLinks';


export default function MyInfo() {

    return (
        <div className='my-info'>
            <img src={Logo} alt='Leonardo Puchetta'/>
            <h4>
                Entra en el mundo del desarrollo web.
                 Deja que tu imaginacion fluya y crea verdaderas maravillas.
            </h4>
            <SocialLinks/>
        </div>
    )
}
