const {valida}= require('./t3.js');

//const { correo } = require("./correo2");

async function validacion(
    rucemisor,
    tipo,
    serie,
    numero,
    tipoid,
    numerodocid,
    fecha,
    importe
     
  )
  {
    try{

        console.log("enttramos ala fucnion de valida ")

        console.log("envciamos a valida")

        console.log(rucemisor)
        console.log(tipo)
        console.log(serie)
        console.log(numero)
        console.log(tipoid)
        console.log(numerodocid)
        console.log(fecha)
        console.log(importe)

        


        const valor3=await valida(rucemisor,tipo,serie,numero,tipoid,numerodocid,fecha,importe);        
        console.log("valor 3",valor3);



        console.log("este es el parametro enviado ")
        var data = [valor3];
        return data

      
       

    }


    catch(e){
        console.log(e);
    }
    
}

module.exports = {
    validacion
  };

//main();
