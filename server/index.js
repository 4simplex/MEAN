const express = require('express');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./database');

const PORT = 3000;

app.set('port', process.env.PORT || PORT);

app.use(morgan('dev'));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/category', require('./routes/category.routes'));

app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
   });