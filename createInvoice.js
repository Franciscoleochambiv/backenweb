const fs = require("fs");
const PDFDocument = require("pdfkit");

///Salida a fichero .svg en la ruta códigos

// var qr = require('qr-image');  
// var fs = require('fs');

// var code = qr.image('Bienvenido a Quewy', { type: 'svg' });  
// var output = fs.createWriteStream('codigos/quewy.svg')

// code.pipe(output); 

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 30 });
  //210 × 297

 doc
  .image("boleta2.jpg", 0, 0, { width: 600 })


  //var code = qr.image('10309611131|500|708', { type: 'png' });  
 // var output = fs.createWriteStream('quewy.png')
  // code.pipe(output);

  generateHeader(doc,invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc,invoice);

  doc.end();
  doc.pipe(fs.createWriteStream(path));

  


}

function generateHeader(doc,invoice) {

  let ndocu="Pedido";
     let comple="";
        if (invoice.tipo_de_comprobante=="01"){
          ndocu="Factura" ;
          comple="Electrónica";          
        }
        if (invoice.tipo_de_comprobante=="03"){
          ndocu="Boleta";
          comple="Electrónica";          
        }        
        if (invoice.tipo_de_comprobante=="05"){
           ndocu="Pedido";
           comple="Electronico";          
        }

  doc
     
    .image("images.jpeg", 270, 20, { width: 130 })

    //.image("boleta2.jpeg", 350, 80, { width: 130 })

    .fillColor("#444444")
    
    //.text(invoice.razonemisor, 150, 57)
    .fontSize(8)    
    .text(invoice.razonemisor, 25, 45)
    .fontSize(14)
    .font("Helvetica-Bold")
    .text(invoice.rucemisor, 475, 45)
    .fontSize(8)
    .font("Helvetica")
    .text("Domicilio Fiscal : "+ invoice.diremisor, 25, 55)
    .fontSize(14)   
    .font("Helvetica-Bold")  
    .text(ndocu, 470, 60)
    .fontSize(8)
    .font("Helvetica")
    .text(invoice.provincia+" "+invoice.ciudad+" "+invoice.distrito, 25, 65 )
    .fontSize(14)
    .font("Helvetica-Bold")  
    .text(comple, 455, 73)
    .fontSize(8)
    .font("Helvetica")  
    .text('RUC : '+ invoice.rucemisor, 25, 75)
    .fontSize(12)
    .font("Helvetica-Bold")  
    .text(invoice.serie+"-"+invoice.numero, 470, 88)
    .fontSize(8)
    .font("Helvetica")  
    .text(formatDate(new Date()), 25, 85)
    .moveDown();
}


function generateCustomerInformation(doc, invoice) {
  const customerInformationTop = 132;

  doc
    .font("Helvetica")  
    .fontSize(8)
    .text("Razon Social : "+ invoice.cliente_denominacion, 50, customerInformationTop)
    .text(formatDate(new Date()), 490, customerInformationTop )

    .text("Nro Doc Identidad : " + invoice.cliente_numero_de_documento, 50, customerInformationTop + 12)
    .text(formatDate(new Date()), 490, customerInformationTop +12)

    .text("Direccion : "+invoice.cliente_direccion, 50, customerInformationTop + 24)
    .text("Moneda : SOLES", 50, customerInformationTop + 36)



/*
    .text("Serie - Numero:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.serie+"-"+invoice.numero, 150, customerInformationTop)
    .font("Helvetica")
    .text("Fecha Emision:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Total:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.total),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text("Razon Social : "+ invoice.cliente_denominacion, 250, customerInformationTop)
    .font("Helvetica")
    .text("Nro Doc Identidad : " + invoice.cliente_numero_de_documento, 250, customerInformationTop + 15)
    .text("Direccion : "+invoice.cliente_direccion, 250, customerInformationTop + 30)

    */
/*
    .text(
      invoice.cliente_direccion +
        ", " +
        invoice.cliente_direccion+
        ", " +
        invoice.cliente_direccion,
      300,
      customerInformationTop + 30
    )
*/
    .moveDown();

//  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  let invoiceTableTop = 185;
  let position=185;
  
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
     position = position + 10;

    generateTableRow(
      doc,
      position, 
      item.codigo,           
      item.quantity,
      item.unidad_de_medida,
      item.product_name,    
      formatCurrency(item.unit_price),      
      formatCurrency(item.quantity*item.unit_price)
    );


   

  }




 

  const subtotalPosition = 275;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "",
    "",
    "Subtotal",  
    formatCurrency(invoice.total_gravada)
  );

  const paidToDatePosition = subtotalPosition + 10;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "",
    "",
    "IGV",    
    formatCurrency(invoice.total_igv)
  );

  const duePosition = paidToDatePosition + 10;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "",
    "",
    "Total",    
    formatCurrency(invoice.total)
  );
  doc.font("Helvetica");




}

function generateFooter(doc,invoice) {
  doc
    //.image("logo.png", 50, 45, { width: 50 })
    .image("quewy.png", 490, 305, { align:"center",width: 80 })
    .fontSize(8)
    .text(invoice.total_letras, 190,312)
      //,{ align: "center", width: 500 })
    .text("Representacion Impresa - Factura Aceptada ",190,350)

}

function generateTableRow(
  doc,
  y,  
  codigo,
  quantity,
  unidad_de_medida,
  description,
  unitCost,  
  lineTotal
) {
  doc
    .fontSize(7)   
    .text(codigo, 50, y)
    .text(quantity,113, y,{ width: 5, align: "right" })
    .text(unidad_de_medida, 145, y)
    .text(description, 170, y)
    .text(unitCost, 480, y )    
    .text(lineTotal,535, y)

    /*
    .text(quantity, 154, y, { width: 5, align: "right" })
    .text(unidad_de_medida, 160, y)
    .text(description, 170, y)
    .text(unitCost, 430, y, { width: 6, align: "right" })    
    .text(lineTotal,475, y, { align: "right" });
    */
}






function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return  (cents/1 ).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
