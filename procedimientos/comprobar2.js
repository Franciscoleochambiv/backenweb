const {valida2,zfill,taskOne,taskTwo}= require('./t3.js');

//const { correo } = require("./correo2");

async function validacion2(
    rucemisor,
    data
     
  )
  {
    try{

        console.log("enttramos ala fucnion de valida ")

        console.log("envciamos a valida")

        console.log(rucemisor)
        console.log(data)

/*
        rucEmisor: '10444864589',
        tipoCDP: '01',
        serieCDP: 'F001',
        numeroCDP: '4',
        tipoDocIdReceptor: '6',
        numeroDocIdReceptor: '10309611131',
        fechaEmision: '13/10/2021',
        importeTotal: 3
      
  */      
        var archivo ="valida.xls";
        const valor1= await taskOne(archivo);
        console.log("valor 1",valor1);



        for(var atr in data){

           var rucEmisor =rucemisor;
           var serie = data[atr].DVC_Serie;
           var tipoCDP= '0'+data[atr].TD_ID;
           var nserie="";
           var receptor="";
           if (tipoCDP==="01"){
             nserie="F"+zfill(serie,3);
             receptor="6";



           }
           else if (tipoCDP==="03"){
            nserie= "B"+zfill(serie,3);
            receptor="0";

           }
           var numeroCDP=data[atr].DVC_Numero;
           var numeroDocIdReceptor=data[atr].PVCL_NroDocIdentidad;
           var fecha=data[atr].fecha;
           var total=data[atr].DVC_Total;

           console.log("datos para la consulta")

           console.log(rucEmisor)    
           console.log(tipoCDP)
           console.log(nserie)      
           console.log(numeroCDP)
           console.log(receptor)
           console.log(numeroDocIdReceptor)
           console.log(fecha)
           console.log(total)

           if (tipoCDP!="05"){
              const valor3=await valida2(rucEmisor,tipoCDP,nserie,numeroCDP,receptor,numeroDocIdReceptor,fecha,total);        
             console.log("valor 3",valor3);
             var data2=rucEmisor+"\t"+fecha+"\t"+tipoCDP+"\t"+nserie+"\t"+numeroCDP+"\t"+numeroDocIdReceptor+"\t"+total+"\t"+valor3+"\n";

              const valor21= await taskTwo(archivo,data2);

              console.log("terminamos la funcion 3",valor21)
           }  



           




        }
        
          //aqui debemos de neviar los datos del array ya transformados y 
          //en cada respue4sta debemos de escribor un txt para que luego pueda ser 
          //revisa o en su defecto un xls
          //for bucle del array


        //const valor3=await valida2(rucemisor,tipo,serie,numero,tipoid,numerodocid,fecha,importe);        
        //console.log("valor 3",valor3);



        //console.log("este es el parametro enviado ")
        //var data = valor3;
        return data

      
       

    }


    catch(e){
        console.log(e);
    }
    
}


module.exports = {
    validacion2
  };

//main();
