const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roles = require('../config/roles');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        default: Roles.USER
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        ref: 'Favorite'
    },
    // refreshToken: {
    //     type: String,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);