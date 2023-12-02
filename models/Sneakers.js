const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sneakersSchema = new Schema({
    "name": String,
    "size": Number,
    "user": String,
    "color": String,
});

const Sneakers = mongoose.model('Sneakers', sneakersSchema);

module.exports = Sneakers;