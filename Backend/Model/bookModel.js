const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true, // ISBN should be unique
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

},

    { timestamps: true }

);

module.exports = mongoose.model('Book', BookSchema, 'books');


