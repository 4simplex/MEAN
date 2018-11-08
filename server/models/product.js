const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    category: {CategorySchema},
	brand: {BrandSchema},
	name: {type: String, required: true},
	code: {type: Number, required: true},
	providerPrice: {type: Number, required: true},
	customerPrice: {type: Number, required: true},
	stockQuantity: {type: Number, required: true},
	description: {type: String, required: false},
	details: {type: String, required: false},
	photo: {type: String, required: false}
});

module.exports = mongoose.model('Product', ProductSchema);