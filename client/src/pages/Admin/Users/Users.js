import React ,{ useState , useEffect }from 'react' ; 
import {getAccessTokenApi} from '../../../api/auth';
import { getUsersActiveApi} from '../../../api/user';

import ListUsers from '../../../components/Admin/Users/ListUsers/ListUsers';
import "./Users.scss";

export default function Users(){
    
    //usuarios activos , se inicializa vacio
    const [usersActive ,setUsersActive] = useState([]) ; 
    //usuarios inactivos , se inicializa en vacio 
    const [usersInactive , setUsersInactive] = useState([]);
    //estado para refrescar datos de usuarios 
    const [reloadUsers , setReloadUsers] = useState(false);

    // traemos el token 
    const token = getAccessTokenApi();

    //este efecto se ejecutara cada vez que el token se actualice 
    useEffect(()=> {
        getUsersActiveApi(token ,true).then(response => { 
            //actualiza usuarios que quedan en el estado users
            setUsersActive(response.users);
        });
        getUsersActiveApi(token ,false).then(response => { 
            //actualiza usuarios que quedan en el estado users
            setUsersInactive(response.users);
        });
        setReloadUsers(false);

    } , [token,reloadUsers]) 

return (

    <div className ='users'>
        
       <ListUsers usersActive={usersActive} usersInactive = {usersInactive} setReloadUsers= {setReloadUsers}/>


    </div>
)


}