// importacion del Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';
// importacion de las paginas de Admin : 
// desde el componente se hace una export default 
// da igual nombre que le pongamos a "AdminHome" , siempre se va a importar 
//el componente Admin 

//Admin pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import AdminUsers from '../pages/Admin/Users/Users';
import AdminMenuWeb from '../pages/Admin/MenuWeb/MenuWeb';
import AdminCourses from '../pages/Admin/Courses';
import AdminBlog from '../pages/Admin/Blog';

//pages 
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
import Blog from '../pages/Blog';

//Others 
import Error404 from '../pages/Error404' ;

// configuracion del sistema de rutas 
// desde aqui podemos cambiar todo el sistema de rutas 

const routes = [{   // rutas de panel de administrador
      
     path : "/admin",
     component: LayoutAdmin,
     exact : false,
     routes : [{                       // array de rutas anidado , rutas hijas 
          path : "/admin",
          component: AdminHome,
          exact : true
               },
               {
          path : "/admin/login",
          component: AdminSignIn,
          exact:true        
               },
               {
          path : "/admin/users",
          component : AdminUsers,
          exact : true
               },
               { 
          // rutas para el MenuWeb 
          path:"/admin/menu" ,
          component : AdminMenuWeb,
          exact: true ,
              
               },
               {
          // rutas para Cursos 
          path:"/admin/courses" ,
          component : AdminCourses,
          exact: true ,    
               },
               {
          // rutas para Blog 
          path:"/admin/blog" ,
          component : AdminBlog,
          exact: true ,    
               },
               {
          component : Error404 ,      
               }
          ]
     },
 
     {  
     path : "/",  // partimos de la raiz 
     exact : false, // porque tendra subrutas 
     component : LayoutBasic,
     routes : [ {                // rutas hijas , de la web general

          path : "/",
          component: Home,
          exact : true
               },
               {
          path : "/contact",
          component: Contact,
          exact:true        
               },
               {
                    path : "/courses",
                    component: Courses,
                    exact:true        
                },
                {
                    path : "/blog",
                    component: Blog,
                    exact:true        
                },
                {
                    path : "/blog/:url",
                    component: Blog,
                    exact:true        
                },
               {
          component : Error404 ,      
               }

     ]   
     
     }
]

export default routes 

