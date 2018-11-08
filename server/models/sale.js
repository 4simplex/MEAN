const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaleSchema = new Schema({
    product: [ProductSchema],
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Sale', SaleSchema);