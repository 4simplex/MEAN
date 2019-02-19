const express = require('express');
const morgan = require('morgan');
const app = express();
const { mongoose } = require('./config/database');
const cors = require('cors');

const PORT = 3000;

app.set('port', process.env.PORT || PORT);

app.use(express.json({
    extended: true,
    limit: '50mb'
}));
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/api/category', require('./routes/category.routes'));
app.use('/api/brand', require('./routes/brand.routes'));
app.use('/api/provider', require('./routes/provider.routes'));
app.use('/api/price', require('./routes/price.routes'));
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/sale', require('./routes/sale.routes'));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});