const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roles = require('../helpers/roles');

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