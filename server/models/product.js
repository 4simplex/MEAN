const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    category: {
		'name': String
	},
	brand: {
		'name': String
	},
	name: {type: String, required: true},
	description: {type: String, required: false},
	fileImg: {type: String, required: false}
});

module.exports = mongoose.model('Product', ProductSchema);