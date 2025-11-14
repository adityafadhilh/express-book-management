const HttpStatus = require('../config/httpStatus');
const CustomError = require('../helpers/customError');
const db = require('../helpers/db');

const findAll = async (query) => {
    let where = {};

    if (query.title) {
        where = {
            ...where,
            title: query.title
        }
    }

    if (query.author) {
        where = {
            ...where,
            author: query.author
        }
    }

    if (query.isbn) {
        where = {
            ...where,
            isbn: query.isbn
        }
    }

    if (query.isbn) {
        where = {
            ...where,
            isbn: query.isbn
        }
    }

    if (query.publisher) {
        where = {
            ...where,
            publisher: query.publisher
        }
    }

    if (query.genre) {
        const genres = query.genre.split(',').map(it => it.trim());
        const genreRegexes = genres.map(g => new RegExp('^' + g + '$', 'i'));
        where = {
            ...where,
            genre: {
                $in: genreRegexes
            }
        }
    }

    const res = await db.Book.aggregate([
        {
            $match: {
                ...where
            },
        },
        {
            $lookup: {
                from: 'reviews',
                localField: 'review',
                foreignField: '_id',
                as: 'reviewDatas'
            }
        }
    ]);
    return res;
};

const create = async (body) => {
    try {
        const findOne = await db.Book.findOne({
            isbn: body.isbn
        });
        if (findOne) {
            throw new CustomError(HttpStatus.BAD_REQUEST, "Book already exist");
        }
        const res = await db.Book.create({
            ...body
        });
        return res;
    } catch (error) {
        throw error
    }
}

const update = async (id, body) => {
    try {
        const res = await db.Book.findByIdAndUpdate(id, {
            ...body,
        }, {
            new: true
        });
        if (!res) throw new CustomError(HttpStatus.BAD_REQUEST, "Failed to update");
        return res;
    } catch (error) {
        throw error;
    }
}

const deleteById = async (id) => {
    try {
        const res = await db.Book.findOneAndDelete({
            _id: id
        });
        if (!res) throw new CustomError(HttpStatus.BAD_REQUEST, "Failed to delete");
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findAll,
    create,
    update,
    deleteById
};