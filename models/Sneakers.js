const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneakersSchema = new Schema({
    username: String,
    email: String,
    size: Number,
    price: Number,
    laces_color: String,
    inside_color: String,
    outside_1_color: String,
    outside_2_color: String,
    outside_3_color: String,
    sole_bottom_color: String,
    sole_top_color: String,
    laces_texture: String,
    inside_texture: String,
    outside_1_texture: String,
    outside_2_texture: String,
    outside_3_texture: String,
    sole_bottom_texture: String,
    sole_top_texture: String,
    status: {type: String, default: "Ready to be produced"},
    date: {
        type: Date,
        default: Date.now
    }
});

const Sneakers = mongoose.model('Sneakers', sneakersSchema);

module.exports = Sneakers;