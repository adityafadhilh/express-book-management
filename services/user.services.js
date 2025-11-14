const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const CustomError = require('../helpers/customError');
const HttpStatus = require('../config/httpStatus');

const findAll = async () => {
    const res = await db.User.find();
    return res;
};

const create = async (body) => {
    try {
        const user = await db.User.findOne({
            email: body.email
        });

        if (user) {
            throw new CustomError(HttpStatus.BAD_REQUEST, "User already exist");
        }

        const res = await db.User.create({
            ...body,
            password: bcrypt.hashSync(body.password, 10)
        });

        return res;
    } catch (error) {
        throw error;
    }
};

const findById = async (id) => {
    try {
        const res = await db.User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(`${id}`)
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'favorites',
                    foreignField: '_id',
                    as: 'FavoriteBooks'
                }
            }
        ]);
        if (!res) throw new CustomError(HttpStatus.NOT_FOUND, "User not found")
        return res;
    } catch (error) {
        throw error;
    }
};

const findByEmail = async (email) => {
    try {
        const res = await db.User.findOne({
            email
        });
        if (!res) throw new CustomError(HttpStatus.NOT_FOUND, "User not found")
        return res;
    } catch (error) {
        throw error;
    }
};

const update = async (id, body) => {
    try {
        const res = await db.User.findByIdAndUpdate(id, {
            ...body,
            updatedAt: Date.now()
        }, {
            new: true
        });
        if (!res) throw new CustomError(HttpStatus.BAD_REQUEST, "Failed to update");
        return res;
    } catch (error) {
        throw error
    }
};

const deleteById = async (id) => {
    try {
        const res = await db.User.findByIdAndDelete(id);
        if (!res) {
            throw new CustomError(HttpStatus.BAD_REQUEST, "Failed to delete");
        }
        // const res = await db.User.deleteOne({
        //     _id: id
        // });
        return res;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findAll,
    create,
    update,
    findById,
    findByEmail,
    deleteById
};