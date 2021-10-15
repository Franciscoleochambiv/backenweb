const {taskOne,taskTwo,taskTree,lectura,firma,leefirma,envio,ticket,escribircdr}= require('./t44.js');

//const { correo } = require("./correo2");

async function anulabol(
    rucemisor, 
    total,
    impuesto,
    subtotal,
    fecha_de_emision,
    fecha_actual,
    razonemisor,
    Nrodocu,
    archivosinfirma,         
    porcentaje_de_igv,
    items    
  )
  {
    try{

      //console.log(req.body)

       console.log("estamosen le procedimiento t44")
      console.log(rucemisor)
       console.log(fecha_de_emision)
       console.log( archivosinfirma)




      console.log(items)
      //firmadozip,firmado,archivosinfirma
      let firmadoori=archivosinfirma.slice(0, -6)+".xml";
      let firmadozip=archivosinfirma.slice(0, -6)+".zip";

      

        console.time('tiempo');
        const valor1=await taskOne(
          rucemisor,           
          fecha_de_emision,
          fecha_actual,
          razonemisor,
          Nrodocu,
          archivosinfirma

            );
        console.log("terminamos la funcion 1 ",valor1);


        const valor2=await taskTwo(archivosinfirma,porcentaje_de_igv,items);

        console.log("terminamos la funcion 2",valor2);


        const valor21= await taskTree(archivosinfirma);

        console.log("terminamos la funcion 3",valor21)

        console.timeEnd('tiempo');

        

        const valor3=await lectura(archivosinfirma);        
        console.log("valor 3",valor3);


        

        const firmado = await firma(firmadozip,firmadoori,archivosinfirma); 
        var estadoresu="";


        console.log("firmado",firmado);

        console.log("firmado",firmado);
          
        const leidofirma = await leefirma(firmado); 

        console.log(leidofirma)

        
              
        const enviar = await envio(firmado,leidofirma,rucemisor);

        console.log("envio ha recibido este parametro",enviar); 
        if(enviar===undefined){
              console.log("ha ocurrido un error y el archivo no se genero")
        }
        else{
           //si nos devuleve el numero de ticket procedemoa a pedir el xml de respuesta 

           const tenviar = await ticket(firmado,rucemisor,enviar);
           const ticketarchivo=tenviar.content;
           //estadoresu=tenviar.statusCode;
           estadoresu=tenviar.statusCode;

           const escrito = await escribircdr(firmado,ticketarchivo);

          //return tenviar

        }
        console.log("este es el resultado final")

        console.log(estadoresu) 
        return estadoresu;
       

    }


    catch(e){
        console.log(e);
    }
    
}

module.exports = {
    anulabol
   };

//main();
