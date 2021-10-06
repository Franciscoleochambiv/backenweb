const fs = require("fs");
var pdf='10309611131-01-F008-1029.pdf'


console.log("vamos a ller el pdf")
console.log(pdf)



const data30 = fs.readFileSync(pdf,{
encoding:"base64"
});

console.log(data30)