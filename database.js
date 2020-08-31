const mongoose = require('mongoose');

const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : "mongodb+srv://sopadecaracol1:sopadecaracol1@cluster0.twipn.mongodb.net/";
    //'mongodb://localhost/merndatabase';
    //const uri = "mongodb+srv://sopadecaracol1:sopadecaracol1>@cluster0.twipn.mongodb.net/popo?retryWrites=true&w=majority";

    //mongoose.connect('mongodb+srv://userName:Passwrod@cluster.mongodb.net/', {dbName: 'yourDbName'});

mongoose.connect(URI, {
    dbName:'mama',
    useNewUrlParser: true,
    useFindAndModify :false,
    useCreateIndex: true,
    autoIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});
