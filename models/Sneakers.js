const sneakersSchema = new Schema({
    name: {type : String, required : true},
    ref: String,
    size: Number,
    description: String,
    price: Number,

});