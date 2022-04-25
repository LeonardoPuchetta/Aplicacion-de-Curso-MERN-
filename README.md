# MERN
Proyecto del curso MERN de Udemy 

## Instalacion 

- Una vez clonado el proyecto en la carpeta local se debera correr el comando **yarn** dentro de la carpeta client , esto instalara los paquetes necesarios para el funcionamiento del proyecto 
- Para levantar el cliente ejecutamos **yarn dev** en la carpeta client
- Para levantar el servidor ejecutamos **yarn start** en la carpeta server
- En Google Chrome debemos tener instalada la extension https://mybrowseraddon.com/access-control-allow-origin.html para el correcto funcionamiento del proyecto



## Descripcion general : 

Se trata de una aplicacion compuesta principalmente por dos secciones , una seccion de Usuario con cursos y blogs donde podemos ver desplegadas una serie de targetas con cursos de Udemy y acceder a distintos blogs previamente creados sobre distintas tematicas relacionadas al desarrollo de software. 
Y una seccion de Administrador donde podemos crear nuevas targetas de cursos por medio un id proporcionado por Udemy asi como tambien crear nuevos blogs compuestos de una imagen de presentacion y su correspondiente contenido .
Esta seccion de Administrador requiere previamente una autenticacion del usuario y es posible tambien crear nuevas secciones para la parte de Usuario desde la misma . 

## Seccion de Administrador
 Para ingresar en esta seccion tendremos en principio un usuario activado (user mail : activado@gmail.com , password: activado)
### En la misma podremos encontrar :
<ul>
<li>
Usuarios : una lista de usuarios activos y otra lista de usuarios inactivos , con la posibilidad de dar de alta nuevos usuarios 
<li>
Menu : una lista de las secciones que aparecen en la cabecera de la pagina principal con la posibilidad de crear nuevas secciones estableciendo un nombre y una url para las mismas . Ademas se pueden modificar las secciones ya existentes . 
<li>
Cursos : una lista de los cursos promocionados los cuales se desplegaran en la seccion de Cursos de la pagina principal . Desde esta seccion se pueden crear nuevos cursos estableciendo la url del curso para poder linkear , un id que proporciona Udemy para cada uno de sus cursos ademas de establecer si el mismo tiene cupon de descuento y su precio.
 <li>
  Blog : en esta seccion podremos crear y actualizar posteos sobre distintas tematicas estableciendo un titulo , una url , una fecha de publicacion y su contenido . 
 <br/>
 
 <h4> Imagen ilustrativa para obtener id de cursos<h4/>

       
  <img src='https://github.com/LeonardoPuchetta/Aplicacion-de-Curso-MERN-/blob/main/Captura3.JPG'>
  
  <br/>
  <br/>
  <h4> Imagen ilustrativa de la seccion Blog<h4/>

       
  <img src='https://github.com/LeonardoPuchetta/Aplicacion-de-Curso-MERN-/blob/main/Captura4.JPG'>
 

   
 <ul/> 
  
