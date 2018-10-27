const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/trailblazer';

const db = mongoose.connect(mongoUri, {useNewUrlParser:true});

module.exports = db;
