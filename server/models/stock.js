const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockSchema = new Schema({
    purchasePrice: { type: number }
});

module.exports = mongoose.model('Stock', StockSchema);