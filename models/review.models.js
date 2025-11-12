const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    description: {
        type: Schema.Types.String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }
});

ReviewSchema.index({user: 1, book: 1}, {unique: true})

module.exports = mongoose.model('Review', ReviewSchema);
