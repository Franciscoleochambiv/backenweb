const fs = require("fs");
const util = require("util");


const writeFile = util.promisify(fs.writeFile);
  var exec1 = require('child_process').exec;

const exec = util.promisify(exec1);
var qr = require('qr-image');  


//const notesCtrl1 = {};



const sleep=util.promisify(setTimeout);

module.exports ={

  

   
   
    
   

    async valida(rucemisor,tipo,serie,numero,tipoid,numerodocid,fecha,importe){
       

        try{

              console.log(rucemisor)
              console.log(tipo)
              console.log(serie)
              console.log(numero)
              console.log(tipoid)
              console.log(numerodocid)
              console.log(fecha)
              console.log(importe)

             
            
            const soap = require('soap');
            //const url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
            const url ="https://e-factura.sunat.gob.pe/ol-it-wsconsvalidcpe/billValidService?wsdl";
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

            let tresultado = await response.validaCDPcriteriosAsync({
                rucEmisor:rucemisor,
                tipoCDP:tipo,
                serieCDP:serie,
                numeroCDP:numero,
                tipoDocIdReceptor:tipoid,
                numeroDocIdReceptor:numerodocid,
                fechaEmision:fecha,
                importeTotal:importe,
                nroAutorizacion:''


//                fileName:firmadozip,
 //               contentFile:data
})
             console.log("esperamos el resultado  este es el cdr")  
             
            // console.log(tresultado[0].applicationResponse)



            

            //let seguridad = await response.setSecurityAsync(wsSecurity)

            console.log("resultado de seguridadxxxxxxxxxxxxxxxxxxx")
            console.log(tresultado)


                
              return (tresultado[0].cdpvalidado.statusCode)
                                                                                                                                                                ;

        }
        catch(e){
            console.log(e);  

          }
       },


       async valida2(rucemisor,tipo,serie,numero,tipoid,numerodocid,fecha,importe){
       

        try{

              console.log(rucemisor)
              console.log(tipo)
              console.log(serie)
              console.log(numero)
              console.log(tipoid)
              console.log(numerodocid)
              console.log(fecha)
              console.log(importe)

             
            
            const soap = require('soap');
            //const url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
            const url ="https://e-factura.sunat.gob.pe/ol-it-wsconsvalidcpe/billValidService?wsdl";
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

            let tresultado = await response.validaCDPcriteriosAsync({
                rucEmisor:rucemisor,
                tipoCDP:tipo,
                serieCDP:serie,
                numeroCDP:numero,
                tipoDocIdReceptor:tipoid,
                numeroDocIdReceptor:numerodocid,
                fechaEmision:fecha,
                importeTotal:importe,
                nroAutorizacion:''


//                fileName:firmadozip,
 //               contentFile:data
})
             console.log("esperamos el resultado  este es el cdr")  
             
            // console.log(tresultado[0].applicationResponse)
            //let final =;



            

            //let seguridad = await response.setSecurityAsync(wsSecurity)

            console.log("resultado de seguridadxxxxxxxxxxxxxxxxxxx")
            console.log(tresultado[0].cdpvalidado.statusCode+"-"+tresultado[0].cdpvalidado.statusMessage)


                
              return (tresultado[0].cdpvalidado.statusCode+"-"+tresultado[0].cdpvalidado.statusMessage)
                                                                                                                                                                ;

        }
        catch(e){
            console.log(e);  

          }
       },

      zfill(number, width) {

        if (number!=undefined){
    
        
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */ 
        var zero = "0"; /* String de cero */  
        
        if (width <= length) {
            if (number < 0) {
                 return ("-" + numberOutput.toString()); 
            } else {
                 return numberOutput.toString(); 
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
            } else {
                return ((zero.repeat(width - length)) + numberOutput.toString()); 
            }
        }
        } 
    },

    async taskOne(archivosinfirma){
      try{
          var plantilla3 ='Ruc Emisor'+"\t"
                          +"Fecha"+"\t"
                          +"Tipo"+"\t"
                          +"Serie"+"\t"
                          +"Numero"+"\t"
                          +"Ruc/Dni"+"\t"
                          +"Importe"+"\t"
                          +"Estado"+"\t"+"\n";                          

          fs.writeFileSync(archivosinfirma, plantilla3);
         
              return  "tress"

         


      }
          
      catch(e){
          console.log(e);
      }

  },
  async taskTwo(archivosinfirma,data){

        
    try{
        
        fs.appendFileSync(archivosinfirma, data, (err) => {
            if (err) throw err;
                console.log('llenado el fro ');
            });


            return  "dos"

       


    }
        
    catch(e){
        console.log(e);
    }


    
}


   

       

    
    

}
