import React from 'react' ; 

export default function Admin(){
    return (
        <div>

            <h1>Seccion de Administrador</h1>

            <p>Para ingresar en esta seccion tendremos en principio un usuario activado (user mail : activado@gmail.com , password: activado)</p>
            
        <h4>En la misma podremos encontrar :</h4>

        <ul>
            <li>
            Usuarios : una lista de usuarios activos y otra lista de usuarios inactivos , con la posibilidad de dar de alta nuevos usuarios 
            </li>
            <li>
            Menu : una lista de las secciones que aparecen en la cabecera de la pagina principal con la posibilidad de crear nuevas secciones estableciendo un nombre y una url para las mismas . Ademas se pueden modificar las secciones ya existentes . 
            </li>
            <li>
            Cursos : una lista de los cursos promocionados los cuales se desplegaran en la seccion de Cursos de la pagina principal . Desde esta seccion se pueden crear nuevos cursos estableciendo la url del curso para poder linkear , un id que proporciona Udemy para cada uno de sus cursos ademas de establecer si el mismo tiene cupon de descuento y su precio.
            </li>
            <li>
            Blog : en esta seccion podremos crear y actualizar posteos sobre distintas tematicas estableciendo un titulo , una url , una fecha de publicacion y su contenido . 
            </li>
        </ul>
        <p> En Google Chrome debemos tener instalada la extension <a href='https://mybrowseraddon.com/access-control-allow-origin.html' target='_blank'>access-control-allow-origin</a> para el correcto funcionamiento del proyecto.
</p>
 <br/>


        
        
        
        </div>

    )
}