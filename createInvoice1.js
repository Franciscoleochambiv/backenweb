const fs = require("fs");
const PDFDocument = require("pdfkit");

///Salida a fichero .svg en la ruta códigos

// var qr = require('qr-image');  
// var fs = require('fs');

// var code = qr.image('Bienvenido a Quewy', { type: 'svg' });  
// var output = fs.createWriteStream('codigos/quewy.svg')

// code.pipe(output); 

function createInvoice1(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  //doc
 // .image("boleta2.jpg", 0, 0, { width: 600 })


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
  doc
    .image("images.jpeg", 350, 80, { width: 130 })

    //.image("boleta2.jpeg", 350, 80, { width: 130 })

    .fillColor("#444444")
    .fontSize(20)
    //.text(invoice.razonemisor, 150, 57)
    .fontSize(10)
    

    .text(invoice.razonemisor, 25, 65)
    .text("Domicilio Fiscal : "+ invoice.diremisor, 10, 75)
    .text(invoice.provincia+" "+invoice.ciudad+" "+invoice.distrito, 10, 90 )
    .text('RUC : '+ invoice.rucemisor, 50, 105)
    .text(formatDate(new Date()), 65, 120)

    .moveDown();
}


function generateCustomerInformation(doc, invoice) {
  let ndocu="Pedido";
  if (invoice.tipo_de_comprobante=="01"){
     ndocu="Factura Electronica";
    
  }
  if (invoice.tipo_de_comprobante=="03"){
    ndocu="Boleta Electronica";
    
  }
  
  if (invoice.tipo_de_comprobante=="05"){
    ndocu="Pedido Electronico";
    
  }
  
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(ndocu, 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(9)
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

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  let invoiceTableTop = 280;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    //"Codigo",
    "Description",
    "            ",
    "Precio Unitario",
    "Cantidad",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  doc.fontSize(9)
  invoiceTableTop = 300;
  let position=300;

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
     position = position + 15;
    //console.log(postition);
    generateTableRow(
      doc,
      position,      
      item.product_name,
      " ",      
      formatCurrency(item.unit_price),
      item.quantity,
      formatCurrency(item.quantity*item.unit_price)
    );


    if (position>660){


      doc.addPage();
      generateHeader(doc,invoice);
      generateCustomerInformation(doc, invoice);
      generateTableRow(
        doc,
        280,
      //  "Codigo",
        "Description",
        "Precio Unitario",
        "Cantidad",
        "Total"
      );
      generateHr(doc, 300);
      doc.font("Helvetica");

      position = 300;


    }

   // generateHr(doc, position + 20);
  }




  if (position>660){


    doc.addPage();
    generateHeader(doc,invoice);
    generateCustomerInformation(doc, invoice);
    generateTableRow(
      doc,
      280,
     // "Codigo",
      "Description",
      "Precio Unitario",
      "Cantidad",
      "Total"
    );
    generateHr(doc,300);
    doc.font("Helvetica");
    position = 300;


  }



  const subtotalPosition = position + 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.total_gravada)
  );

  const paidToDatePosition = subtotalPosition + 15;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "IGV",
    "",
    formatCurrency(invoice.total_igv)
  );

  const duePosition = paidToDatePosition + 15;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Total",
    "",
    formatCurrency(invoice.total)
  );
  doc.font("Helvetica");




}

function generateFooter(doc,invoice) {
  doc
    //.image("logo.png", 50, 45, { width: 50 })
    .image("quewy.png", 220, 600, { align:"center",width: 150 })
    .fontSize(10)
    .text("Importe en Letras : "+invoice.total_letras, 50,580,{ align: "center", width: 500 })
    .text("Factura Aceptada", 50,780,{ align: "center", width: 500 });

}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(8)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
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
  return "S/." + (cents/1 ).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice1
};
