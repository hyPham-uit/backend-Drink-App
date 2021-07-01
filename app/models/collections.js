const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collections = new Schema( //create schema for document Course
    {
        id: { type: mongoose.Schema.Types.ObjectId, required: true},//id of category
        name: { type: String,required: true },
        imageUrl: { type: String, required: true },
        price: {type: Number, required: true},
        rating: {type: Number, default: 3.5},
    },
);
module.exports = mongoose.model('collections', collections);



