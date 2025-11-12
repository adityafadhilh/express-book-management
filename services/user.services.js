const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const userModels = require('../models/user.models');

const findAll = async () => {
    const res = await db.User.find();
    return res;
}

const create = async (body) => {
    try {
        const user = await db.User.findOne({
            email: body.email
        });

        if (user) {
            throw "User already exist";
        }

        const res = await db.User.create({
            ...body,
            password: bcrypt.hashSync(body.password, 10)
        });

        return res;
    } catch (error) {
        throw error;
    }
}

const findById = async (id) => {
    const res = await db.User.findById(id);
    if (!res) throw "User not found"
    return res;
}

const findByEmail = async (email) => {
    const res = await db.User.findOne({
        email
    });
    return res;
}

const update = async (id, body) => {
    const res = await db.User.findByIdAndUpdate(id, {
        ...body,
        updatedAt: Date.now()
    }, {
        new: true
    });
    if (!res) throw "User not available"
    return res;
}

const deleteById = async (id) => {
    const findOne = await db.User.findById(id);
    if (!findOne) {
        throw "User not found";
    }
    const res = await db.User.deleteOne({
        _id: id
    });
    return res;
}

module.exports = {
    findAll,
    create,
    update,
    findById,
    findByEmail,
    deleteById
}