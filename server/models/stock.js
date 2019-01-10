const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockSchema = new Schema({
    productForm: { },
    provider: { },
    purchasePrice: { type: Number },
    salePrice: { type: Number },
    productCode: { type: String },
});

module.exports = mongoose.model('Stock', StockSchema);