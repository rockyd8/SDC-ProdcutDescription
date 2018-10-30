const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const descriptionSchema = new mongoose.Schema({
  productName: String,
  productId: Number,
  features: [String],
  techSpecs: [{types: String, description: String, measurement: Boolean}]
});

const Description = mongoose.model('Description', descriptionSchema);

module.exports = Description;
