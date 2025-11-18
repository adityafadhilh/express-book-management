const HttpStatus = require('../config/httpStatus');
const CustomError = require('../helpers/customError');
const db = require('../helpers/db');

const create = async (userId, bookId) => {
    try {
        const res = await db.Favorite.create({
            userId,
            bookId
        });

        if (!res) throw new CustomError(HttpStatus.BAD_REQUEST, 'Failed to add favorite');

        await db.User.findByIdAndUpdate(userId, {
            $push: {
                favorites: bookId
            },
            updatedAt: Date.now()
        });

        return res;
    } catch (error) {
        throw error
    }
};

const deleteByBookId = async (userId, bookId) => {
    try {
        const res = await db.Favorite.findOneAndDelete({
            bookId,
            userId
        });

        await db.User.findOneAndUpdate({
            _id: userId,
        }, {
            $pull: {
                favorites: bookId
            }
        });
        return res;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    create,
    deleteByBookId
};