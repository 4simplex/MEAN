const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockSchema = new Schema({
    purchasePrice: { type: Number },
    salePrice: { type: Number },
    stockQty: { type: Number },
});

module.exports = mongoose.model('Stock', StockSchema);