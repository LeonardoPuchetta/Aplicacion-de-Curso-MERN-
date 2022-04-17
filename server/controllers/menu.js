// importacion del modelo 
const Menu = require ('../models/menu') ;


function addMenu(req , res){  // funcion para crear nuevo objeto menu 

// recibe datos del modelo por el body 
const {title , url , order , active } = req.body ;

//creacion de un nuevo objeto menu 
const menu = new Menu();

menu.title = title;
menu.url = url ;
menu.active = active ;
menu.order = order ; 

// registro del menu en la base de datos 
menu.save((err ,createdMenu ) => {

    if (err) {
        res.status(500).send({message : 'Error en el servidor.'})
    } else {
        if (!createdMenu){
            res.status(404).send({message:'Error al crear el menu.'})
        } else {
            res.status(200).send({message:'Menu creado correctamente.'})
        }
    }

})


}

 
function getMenus(req , res) {    //funcion que nos devuelve los menu de la base
    //accedemos al modelo 
    Menu.find()
        //ordenamos el resultado de la busqueda con sort({campoDeordenamiento : "criterio"})
        .sort({order:"asc"})
        //se ejecuta la query a mongo
        .exec((err ,menusStored) => {
                if (err){
                    res.status(500).send({message: 'Error del servidor.'})
                } else {
                    if (!menusStored){
                        res.status(404).send({message:"no se ha encontrado ningun elemento en el menu"})
                    } else {
                        res.status(200).send({menu: menusStored})
                    }
                }
            })
        }

function updateMenu(req, res){   //funcion para actualizar datos del menu 
    let menuData = req.body;
    const params = req.params ; 

    Menu.findByIdAndUpdate(params.id, menuData ,(err,menuUpdate) => {

        if (err){
            res.status(500).send({message:'Error del servidor.'})
        } else {
            if (!menuUpdate){
                res.status(404).send({message: 'No se ha encontrado ningun menú.'})
            } else {
                res.status(200).send({message: 'Menu actualizado correctamente.'})
            }
        }
    })
}

function activateMenu(req,res){  //activa o desactiva un menu 

    const {id} = req.params ;
    const {active} = req.body;

    Menu.findByIdAndUpdate(id, {active} , (err, menuStored)=> {
        if (err){
            res.status(500).send({message : 'Error en el servidor.'})
            } else {
                if (!menuStored){
                    res.status(404).send({message: 'No se ha encontrado el menú.'})
                    } else {
                        if (active === true){
                            res.status(200).send({message : 'Menu activado correctamente.'})
                        } else {
                            res.status(200).send({message : 'Menu desactivado correctamente.'})

                        }
                    }
            }
    })

}

function deleteMenu(req,res) { // elimina menu

    const {id} = req.params ;

    Menu.findByIdAndRemove(id , (err,menuDeleted) =>{
        if (err){
            res.status(500).send({message : 'Error en el servidor.'})
             } else {
                if (!menuDeleted){
                    res.status(404).send({message: 'No se ha encontrado el menú.'})
                } else {
                    res.status(200).send({message : 'Menu eliminado correctamente.'})
                }
            }
    })
}


module.exports = {
    addMenu,
    getMenus,
    updateMenu,
    activateMenu,
    deleteMenu
}