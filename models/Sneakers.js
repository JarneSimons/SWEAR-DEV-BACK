const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneakersSchema = new Schema({
    username: String,
    email: String,
    size: Number,
    laces: String,
    inside: String,
    outside_1: String,
    outside_2: String,
    outside_3: String,
    sole_bottom: String,
    sole_top: String,
    texture: String,
    price: Number,
});

const Sneakers = mongoose.model('Sneakers', sneakersSchema);

module.exports = Sneakers;