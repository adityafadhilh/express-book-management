const mongoose = require('mongoose');

mongoose.connect('mongodb://'+ process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected DB!');
    })

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.models'),
    Book: require('../models/book.models'),
    Review: require('../models/review.models'),
    Favorite: require('../models/favorite.models')
};