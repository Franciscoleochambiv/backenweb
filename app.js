const express = require('express');
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 3500);

// middlewares 




//app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

// routes
app.use('/api/notes', require('./routes/notes'));


app.use('/api/customers', require('./routes/customer'));


app.use('/api/users', require('./routes/users'));
app.use('/api/resubol', require('./routes/resubol'));
app.use('/api/resubolanu', require('./routes/resubolanu'));
app.use('/api/ruc', require('./routes/ruc'));
module.exports = app;
