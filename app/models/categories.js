const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = new Schema( //create schema for document Course
    {
        title: { type: String, maxLength: 255, required: true },
        imageUrl: { type: String, required: true },
    }
);
module.exports = mongoose.model('categories', categories);


