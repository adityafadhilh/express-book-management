const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    publisher: {
        type: String,
        required: true,
    },
    pages: {
        type: Number
    },
    coverImageUrl: {
        type: String
    },
    genre: {
        type: [String],
        default: []
    },
    review: {
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    },
    // averageRating: {
    //     type: Number,
    //     default: 0,
    //     min: 0,
    //     max: 5
    // },
});

module.exports = mongoose.model('Book', BookSchema);