const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockSchema = new Schema({
    purchasePrice: { type: Number },
    salePrice: { type: Number },
    stockQuantity: { type: Number },
    productCode: { type: String },
});

module.exports = mongoose.model('Stock', StockSchema);