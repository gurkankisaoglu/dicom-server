const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    fileName: String,
    img: String
});

module.exports = imageSchema;
