// funciones para validar inputs o formularios 


export function minLengthValidation(inputData , minLength){


    //sacamos el valor de inputData 
    const {value} = inputData ;
    // reseteamos inputData
    removeClassErrorSucess ( inputData );
    

    if (value.length >= minLength){
       
        // formulario es correcto 
        inputData.classList.add("sucess");
        return true ;

    } else {

        inputData.classList.add("error");
        return false ; 

    }
}

export function emailValidation( inputData ){

    // necesitamos una expresion regular 
    // de los caracteres que lleva un email 

    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const {value} = inputData ; 

    // removemos la clase de error o sucess 
    removeClassErrorSucess ( inputData );

    //validacion de caracteres 
    const resultValidation = emailValid.test(value); 
    if (resultValidation){
        inputData.classList.add('sucess');
        return true

    } else {
        inputData.classList.add('error');
        return false
    }
}




// remueve clase de Error o de Sucess del inputData

function removeClassErrorSucess ( inputData ){

    inputData.classList.remove('sucess');
    inputData.classList.remove('error');
}