import React from 'react';

//para importa svg como si fuesen componentes de react 

import {ReactComponent as YotubeIcon} from '../../../assets/img/svg/youtube.svg';
import {ReactComponent as TwitterIcon} from '../../../assets/img/svg/twitter.svg';
import {ReactComponent as InstagramIcon} from '../../../assets/img/svg/instagram.svg';
import {ReactComponent as LinkedinIcon} from '../../../assets/img/svg/linkedin.svg';
import {ReactComponent as FacebookIcon} from '../../../assets/img/svg/facebook.svg';

import './SocialLinks.scss';

export default function SocialLinks() {


    return (
       <div className='social-links'>
           <a href='https://www.youtube.com/watch?v=526pXl6iYWA'
                className='youtube'
                target='_blank' 
                rel ='noopener noreferrer'>
               <YotubeIcon/>
           </a>
           <a href='https://twitter.com/home'
                className='twitter'
                target='_blank' 
                rel ='noopener noreferrer'>
               <TwitterIcon/>
           </a>
           <a href='https://www.instagram.com/'
                className='instagram'
                target='_blank' 
                rel ='noopener noreferrer'>
               <InstagramIcon/>
           </a>
           <a href='https://www.linkedin.com/'
                className='linkedin'
                target='_blank' 
                rel ='noopener noreferrer'>
               <LinkedinIcon/>
           </a>
           <a href='https://www.facebook.com/'
                className='facebook'
                target='_blank' 
                rel ='noopener noreferrer'>
               <FacebookIcon/>
           </a>
       </div>
    )
}