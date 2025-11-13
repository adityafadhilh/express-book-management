const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    updatedAt: {
        type: Schema.Types.Date,
        default: Date.now()
    }
});

// FavoriteSchema.index({ user: 1, book: 1 }, { unique: true })

module.exports = mongoose.model('Favorite', FavoriteSchema)