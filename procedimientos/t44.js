const fs = require("fs");
const util = require("util");


const writeFile = util.promisify(fs.writeFile);
  var exec1 = require('child_process').exec;

const exec = util.promisify(exec1);



//const notesCtrl1 = {};

const Note1 = require('../models/Note');



const ENDPOINT2 = "http://157.245.124.102:7001";
const ENDPOINT3 = "http://localhost:3010";

const sleep=util.promisify(setTimeout);



module.exports ={

    async taskOne(
      
      rucemisor,     
      fecha_de_emision,
      fecha_actual,
      razonemisor,
      Nrodocu,
      archivosinfirma     
                        ){

        try{  
         // var f = new Date();
         // horaA=f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate();


  var plantilla='<?xml version="1.0" encoding="UTF-8"?>'+
  '<SummaryDocuments xmlns="urn:sunat:names:specification:ubl:peru:schema:xsd:SummaryDocuments-1" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2" xmlns:sac="urn:sunat:names:specification:ubl:peru:schema:xsd:SunatAggregateComponents-1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'+
    '<ext:UBLExtensions>'+
      '<ext:UBLExtension>'+
        '<ext:ExtensionContent>'+
          '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">'+
           '<SignedInfo>'+
              '<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>'+
              '<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>'+
              '<Reference URI="">'+
              '<Transforms>'+
                 '<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />'+
              '</Transforms>'+
              '<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>'+
              '<DigestValue></DigestValue>'+
              '</Reference>'+
           '</SignedInfo>'+
           '<SignatureValue/>'+
          '<KeyInfo>'+
          '<X509Data>'+
          '<X509SubjectName/>'+    
          '<X509Certificate/>'+
          '</X509Data>'+
          '</KeyInfo>'+
        '</Signature>'+   
        '</ext:ExtensionContent>'+
      '</ext:UBLExtension>'+
    '</ext:UBLExtensions>'+
    '<cbc:UBLVersionID>2.0</cbc:UBLVersionID>'+
    '<cbc:CustomizationID>1.1</cbc:CustomizationID>'+
    '<cbc:ID>'+Nrodocu+'</cbc:ID>'+
    '<cbc:ReferenceDate>'+fecha_de_emision+'</cbc:ReferenceDate>'+
    '<cbc:IssueDate>'+fecha_actual+'</cbc:IssueDate>'+
    '<cac:Signature>'+
      '<cbc:ID>'+rucemisor+'</cbc:ID>'+
      '<cac:SignatoryParty>'+
        '<cac:PartyIdentification>'+
          '<cbc:ID>'+rucemisor+'</cbc:ID>'+
        '</cac:PartyIdentification>'+
        '<cac:PartyName>'+
          '<cbc:Name>'+razonemisor+'</cbc:Name>'+
        '</cac:PartyName>'+
      '</cac:SignatoryParty>'+
      '<cac:DigitalSignatureAttachment>'+
        '<cac:ExternalReference>'+
          '<cbc:URI>'+rucemisor+'</cbc:URI>'+
        '</cac:ExternalReference>'+
      '</cac:DigitalSignatureAttachment>'+
    '</cac:Signature>'+
    '<cac:AccountingSupplierParty>'+
      '<cbc:CustomerAssignedAccountID>'+rucemisor+'</cbc:CustomerAssignedAccountID>'+
      '<cbc:AdditionalAccountID>6</cbc:AdditionalAccountID>'+
      '<cac:Party>'+
        '<cac:PartyLegalEntity>'+
          '<cbc:RegistrationName>'+razonemisor+'</cbc:RegistrationName>'+
        '</cac:PartyLegalEntity>'+
      '</cac:Party>'+
    '</cac:AccountingSupplierParty>';
  







               fs.writeFileSync(archivosinfirma, plantilla);






           // throw new Error('error lolo');
            //await sleep(4000);
            return 'ONE ';    
        }
        catch(e){ 
            console.log("existe un error");
            console.log(e);
        }

        
    },

    async taskTwo(archivosinfirma,porcentaje_de_igv,items){


        try{

        /*
            [ { id: 1,
                codigo: 'MCN-001',
                unidad: 'niu',
                cantidad: '8',
                precio: '7',
                descripcion: 'MANGUERA DE RADIADOR 3/4',
                total1: 56 },
              { id: 2,
                codigo: 'BCN-002',
                unidad: 'niu',
                cantidad: '8',
                precio: '9',
                descripcion: 'BOCAMASA  3/4',
                total1: 128 } ]
                */
          
            
            var item=0;


            
            for(var atr in items){


                item=item+1; 

                var nrobol1=items[atr].serie+"-"+items[atr].numerobol;



                var plantilla2=
                 '<sac:SummaryDocumentsLine>'+
                    '<cbc:LineID>'+item.toString()+'</cbc:LineID>'+
                    '<cbc:DocumentTypeCode>'+items[atr].tipo+'</cbc:DocumentTypeCode>'+
                    '<cbc:ID>'+nrobol1+'</cbc:ID>'+
                    '<cac:AccountingCustomerParty>'+
                      '<cbc:CustomerAssignedAccountID>-</cbc:CustomerAssignedAccountID>'+
                      '<cbc:AdditionalAccountID>-</cbc:AdditionalAccountID>'+
                    '</cac:AccountingCustomerParty>'+
                    '<cac:Status>'+
                      '<cbc:ConditionCode>3</cbc:ConditionCode>'+
                    '</cac:Status>'+
                    '<sac:TotalAmount currencyID="PEN">'+items[atr].total+'</sac:TotalAmount>'+
                    '<sac:BillingPayment>'+
                      '<cbc:PaidAmount currencyID="PEN">'+items[atr].subtotal+'</cbc:PaidAmount>'+
                      '<cbc:InstructionID>01</cbc:InstructionID>'+
                    '</sac:BillingPayment>'+
                    '<cac:TaxTotal>'+
                      '<cbc:TaxAmount currencyID="PEN">'+items[atr].impuesto+'</cbc:TaxAmount>'+
                      '<cac:TaxSubtotal>'+
                        '<cbc:TaxAmount currencyID="PEN">'+items[atr].impuesto+'</cbc:TaxAmount>'+
                        '<cac:TaxCategory>'+
                          '<cac:TaxScheme>'+
                            '<cbc:ID>1000</cbc:ID>'+
                            '<cbc:Name>IGV</cbc:Name>'+
                            '<cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>'+
                          '</cac:TaxScheme>'+
                        '</cac:TaxCategory>'+
                      '</cac:TaxSubtotal>'+
                    '</cac:TaxTotal>'+
               '</sac:SummaryDocumentsLine>';

                
                         fs.appendFileSync(archivosinfirma, plantilla2, (err) => {
                        if (err) throw err;
                            console.log('llenado el fro ');
                        });

                    }   





            //await sleep(2000);
            return 'TWO';

        }
        catch(e){
               console.log(e);   
        }

        
    },

    async taskTree(archivosinfirma){

        
        try{
            var plantilla3 ='</SummaryDocuments>';
            fs.appendFileSync(archivosinfirma, plantilla3, (err) => {
                if (err) throw err;
                    console.log('llenado el fro ');
                });


                return  "tress"

           


        }
            
        catch(e){
            console.log(e);
        }


        
    } ,       

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
    async firma(firmadozip,firmado,archivosinfirma){
        try{
             

           //const  firmadozip='10309611131-01-F001-2045.zip';
	       //const  firmado='./10309611131-01-F001-2045.xml';
           //const  archivosinfirma='./10309611131-01-F001-2045sf.xml';

           //var exec = require('child_process').exec, 
           var child; 

           

           var orden2=' xmlsec1 --sign --privkey-pem private_key.pem,certificado.pem --output '+firmado +' '+ archivosinfirma ;
           var orden3 = " && zip "+ firmadozip+ " "+ firmado;

           console.log(orden2+orden3);

       //    child = await exec(orden2);


           const { stdout, stderr } = await exec(orden2+orden3);

                if (stderr) {
                    console.error(`error: ${stderr}`);
                }
                console.log(`Number of files ${stdout}`);
                


           return firmadozip;                                                                                                                                                          ;

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

            let tresultado = await response.sendSummaryAsync({
                fileName:firmadozip,
                contentFile:data})
             console.log("esperamos el resultado  este es el cdr")  
             
            // console.log(tresultado[0].applicationResponse)



            

            //let seguridad = await response.setSecurityAsync(wsSecurity)

            console.log("resultado de seguridadxxxxxxxxxxxxxxxxxxx")
            console.log(tresultado[0].ticket)


                
              return (tresultado[0].ticket)
                                                                                                                                                                ;

        }
        catch(e){
            console.log(e);  

          }
       },

       async ticket(parameter1,rucemisor,nticket){

        try{
             
            const firmadozip=parameter1;
            const data=nticket; 
            const resultado= "RR-"+firmadozip;

            const soap = require('soap');
            //const url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
            //const url = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
            const url ="https://e-factura.sunat.gob.pe/ol-ti-itcpfegem/billService?wsdl";
            const options = {
                    forceSoap12Headers: false
                };

            var args = {name: 'value'};


            console.log("entramos  a la funcion de PEDIDO DE TICKET ");    
                
                   
            let response =  await  soap.createClientAsync(url, options)
           // console.log(response)
            var wsSecurity = new soap.WSSecurity(rucemisor+"FRANCO13", "FRANCISCOa1", {});

           // console.log(wsSecurity)

            console.log("terminamos de displayat la seguridad")

            response.setSecurityAsync(wsSecurity);

            console.log("establecemos setsecurity")

            let tresultado = await response.getStatusAsync({
                ticket:nticket
                })
             console.log("esperamos el resultado  del ticket este es el cdr")  
             
            // console.log(tresultado[0].applicationResponse)



            

            //let seguridad = await response.setSecurityAsync(wsSecurity)

            console.log("resultado de seguridadxxxxxxxxxxxxxxxxxxx")
            console.log(tresultado[0].status)


                
              return (tresultado[0].status)
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



       async leepdf(parameter1){
        try{
             
            const pdf=parameter1;
            //parameter1; 

            

            console.log("vamos a ller el pdf")
            console.log(pdf)

            
           await sleep(2000); 

           const data30 = fs.readFileSync(pdf,{
            encoding:"base64"
           });

           console.log(data30)
           
           //let busca=firmadozip.slice(0, -4);
           
           //console.log("estamos en la opcion de  busqueda y acturalizacon de data")
           //console.log(busca);


        /*
             Note1.findOneAndUpdate(
                {title:busca},
                {xml_zip_base64:data},
                )
                .then(console.log("encontrado"))
                .catch(console.log("error"))    
            
           
      */

             


           
            return data30;

        }
        catch(e){
            console.log(e);  

          }
       },


       
    


    
       

       async qrdato(parameter1){

       

        try{

            
            //const fs_createWriteStream = util.promisify(fs.createWriteStream);
           // const qr_image = util.promisify(qr.image);
            //const qr_pipe = util.promisify(qr.image);



           console.log("estamos generando la imagen ")  

            var code =  qr.image(parameter1, { type: 'png' });  
            var output =  fs.createWriteStream('quewy.png');
            code.pipe(output);             
            return 

        }
        catch(e){
            console.log(e);  

          }
       },



       async enviacorreo(ema,xml,cdr,archivot,razonemisor,cliente_numero_de_documento,cliente_denominacion,pdf,tipo_de_comprobante){


        const axios = require('axios')
        console.log("este es el coreo")
        console.log(ema)


        try{
             
            
             axios.post(ENDPOINT2+'/api/shoping1/correo', {           
                 email:ema,
                 xml:xml,
                 cdr:cdr,                
                 archivot:archivot,
                 razonemisor:razonemisor,
                 clienteruc:cliente_numero_de_documento,
                 clientename:cliente_denominacion,
                 pdf:pdf,
                 tipo:tipo_de_comprobante
                
            })              
            .then(res =>  
             
              //datacodcli=(res.data[0].id)+1
            //  this.fetchcodigo()
            console.log("qwqw")

            )
            .catch(err =>
              console.log(err)
             )


            

        }
        catch(e){
            console.log(e);  

          }
       },

       async imppdf(archivot){


        const axios = require('axios')
        //console.log("este es el coreo")
        console.log(archivot)


        try{

            // window.open('10309611131-01-F001-2529.pdf');
             
            
             axios.get(ENDPOINT3+'/imprimir')              
            .then(res =>  
             
              //datacodcli=(res.data[0].id)+1
            //  this.fetchcodigo()
            console.log("envismos la impresion")

            )
            .catch(err =>
              console.log(err)
             )


            

        }
        catch(e){
            console.log(e);  

          }
       }

    







}
