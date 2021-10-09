const fs = require("fs");
const util = require("util");


const writeFile = util.promisify(fs.writeFile);
  var exec1 = require('child_process').exec;

const exec = util.promisify(exec1);
var qr = require('qr-image');  


//const notesCtrl1 = {};



const sleep=util.promisify(setTimeout);

module.exports ={

  

   
   
    async lectura(parameter1){
        try{
             

           //const  firmadozip='10309611131-01-F001-218.zip';
	      // const  firmado='./10309611131-01-F001-2148sf.xml';
           const  archivosinfirma=parameter1;
           
           fs.statSync(archivosinfirma);
           console.log('file or directory exists');

            //await sleep(2000);
            return archivosinfirma;

        }
        catch(e){
               console.log(e);   
        }

        
    },

   

       async leefirma(parameter1){
        try{
             
            const firmadozip=parameter1; 

           const data = fs.readFileSync(firmadozip,{
            encoding:"base64"
           });
           
           let busca=firmadozip.slice(0, -4);
           
           console.log("estamos en la opcion de  busqueda y acturalizacon de data")
           console.log(busca);


        /*
             Note1.findOneAndUpdate(
                {title:busca},
                {xml_zip_base64:data},
                )
                .then(console.log("encontrado"))
                .catch(console.log("error"))    
            
           
      */

             


           
            return data;

        }
        catch(e){
            console.log(e);  

          }
       },


       async envio(parameter1,parameter2,rucemisor){

        try{
             
            const firmadozip=parameter1;
            const data=parameter2; 
            const resultado= "R-"+firmadozip;

            const soap = require('soap');
            //const url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
            const url ="https://e-factura.sunat.gob.pe/ol-ti-itcpfegem/billService?wsdl";
            const options = {
                    forceSoap12Headers: false
                };

            var args = {name: 'value'};


            console.log("entramos  a la funcion de envio ");    
                
                   
            let response =  await  soap.createClientAsync(url, options)
           // console.log(response)
            var wsSecurity = new soap.WSSecurity(rucemisor+"FRANCO13", "FRANCISCOa1", {});

           // console.log(wsSecurity)

            console.log("terminamos de displayat la seguridad")

            response.setSecurity(wsSecurity);

            console.log("establecemos setsecurity")

            let tresultado = await response.sendBillAsync({
                fileName:firmadozip,
                contentFile:data})
             console.log("esperamos el resultado  este es el cdr")  
             
            // console.log(tresultado[0].applicationResponse)



            

            //let seguridad = await response.setSecurityAsync(wsSecurity)

            console.log("resultado de seguridadxxxxxxxxxxxxxxxxxxx")
            console.log(response)


                
              return (tresultado[0].applicationResponse)
                                                                                                                                                                ;

        }
        catch(e){
            console.log(e);  

          }
       },
       async escribircdr(parameter1,parameter2){
        try{

            let busca=parameter1.slice(0, -4);


            /*

           Note1.findOneAndUpdate(
                {title:busca},
                {cdr_zip_base64:parameter2},
                )
                .then(console.log("encontradocdr"))
                .catch(console.log("errorcdr"))    

      */

             

           const  firmadozipcdr="R-"+parameter1;

           //const archivo=util.promisify(fs);

          const fs_writeFile = util.promisify(fs.writeFile) 



          await fs_writeFile(firmadozipcdr,parameter2 ,{
            encoding:"base64"
           })
	       
          

           
            return firmadozipcdr;

        }
        catch(e){
               console.log(e);   
        }
        
    },


    async leefirmacdr1(parameter1){
        try{
             
            const firmadozip=parameter1; 

           const data = fs.readFileSync(firmadozip,{
            encoding:"base64"
           });
           
           let busca=firmadozip.slice(0, -4);
           
           console.log("estamos en la opcion de  busqueda y acturalizacon de data")
           console.log(busca);


        /*
             Note1.findOneAndUpdate(
                {title:busca},
                {xml_zip_base64:data},
                )
                .then(console.log("encontrado"))
                .catch(console.log("error"))    
            
           
      */

             


           
            return data;

        }
        catch(e){
            console.log(e);  

          }
       },



    

}
