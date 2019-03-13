const mongoose = require('mongoose');
const { Schema } = mongoose;

const MpSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Mp', MpSchema);