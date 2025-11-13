const db = require('../helpers/db');

const create = async (userId, bookId) => {
    try {
        const res = await db.Favorite.create({
            userId,
            bookId
        });

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
}

module.exports = {
    create
}