
const Newsletter = require('../models/newsletter');

function suscribeEmail (req,res) {

    //traemos el correo por la url 
    const email = req.params.email ;

    //creamos una nueva instancia de newsletter 
    const newsletter = new Newsletter();

    if (!email) {    // "code:404" permite que el front pueda acceder a la respuesta
        res.status(404).send({ code:404 , message : 'El email es obligatorio.'  })
    } else {
        //asignamos el valor en minusculas 
        newsletter.email = email.toLowerCase() ; 
        //guardamos el valor
        newsletter.save((err, newsletterStore ) => {

            if (err) {
                res.status(500).send({ code:500 , message : 'El email ya existe.'  })
                } else {
                    if(!newsletterStore){
                        res.status(404).send({ code:404 , message : 'Error al registrar en la newsletter.'  })
                    } else {
                        res.status(200).send({ code:200, message : 'Email registrado correctamente.'  })
                    }
                }
            })
    }

};

module.exports = {
    suscribeEmail,
}