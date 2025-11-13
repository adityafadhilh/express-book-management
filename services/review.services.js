const db = require('../helpers/db');

const create = async (body) => {
    try {
        const res = await db.Review.create({
            ...body
        });
        const bookId = body.book;
        await db.Book.findByIdAndUpdate(bookId, {
            $push: { review: res._id},
        });
        return res;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    create
};