const https = require("https");
const fs = require("fs");
const path = require('path');


require('dotenv').config();
const app = require('./app');

require('./database');

async function main() {


    const httpsOptions = {
        cert:fs.readFileSync(path.join(__dirname,'ctr','cert2.pem')),
        key:fs.readFileSync(path.join(__dirname,'ctr','privkey2.pem'))
     }
     
    const port = process.env.PORT || 3500;
    /* 
    await  https.createServer(httpsOptions,app)
       .listen(port,function(){
        console.log(`Server running on port https ` + port)      
           })
     
     */
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();
