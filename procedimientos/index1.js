const {lectura,leefirma,envio,escribircdr,leefirmacdr1}= require('./t2.js');

//const { correo } = require("./correo2");

async function menu(
     archivo
  )
  {
    try{


        const valor3=await lectura(archivo);        
        console.log("valor 3",valor3);



        if (valor3==undefined){
            console.log("no se LEER EL ARCHIVO ");
        }
        else{
          console.log(" valor 3 esta correto");  
          
          const leidofirma = await leefirma(archivo); 
          let rucemisor=archivo.slice(0, -14);
          let firmado=archivo;
          

          
          const enviar = await envio(archivo,leidofirma,rucemisor);

          console.log("envio ha recibido este parametro",enviar); 
          if(enviar===undefined){
              console.log("ha ocurrido un error y el archivo no se genero")
          }
          else{


           // const imp = await imprimir(firmado);




            const escrito = await escribircdr(firmado,enviar);

            //devolver el archivo xml
            //devolcer wl archivo cdr
            //devolver pdf


            


            console.log("fin del procesimiento",escrito); 
            if(escrito===undefined){
                console.log("ha ocurrido un error en el cdr")
            }
            else{

              
                 
                //devolver el cdr

                
            }

  


          }

          

        }


       

        const leidofirmazip = await leefirma(archivo);
        const leidofirmacdrzip = await leefirmacdr1("R-"+archivo);
        


        //const imprimepdf=await imppdf(archivot);

        //undefined
        

        
       // console.log(leidofirmacdrzip);


        //var corre=correo('grupo23pe@yahoo.com',leidofirmazip,leidofirmacdrzip);

        console.log("este es el parametro enviado ")
       // console.log(email)

       
 
         
        var data = [leidofirmazip,leidofirmacdrzip];
        return data

      
       

    }


    catch(e){
        console.log(e);
    }
    
}

module.exports = {
    menu
  };

//main();
