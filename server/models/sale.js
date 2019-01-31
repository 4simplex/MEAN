const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaleSchema = new Schema({
    items: {
        price: {},
    },
    stockSoldTotal: { type: Number, required: true },
    saleTotal: { type: Number, required: true },
    taxesTotal: { type: Number, required: true },
    saleDate: { type: Date, required: true }
});

module.exports = mongoose.model('Sale', SaleSchema);