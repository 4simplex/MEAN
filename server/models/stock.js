const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockSchema = new Schema({
    productForm: { },
    provider: {
		'_id': String,
		'name': String
	},
    purchasePrice: { type: Number },
    salePrice: { type: Number },
    productCode: { type: String },
});

module.exports = mongoose.model('Stock', StockSchema);