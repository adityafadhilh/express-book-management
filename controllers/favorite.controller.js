const favoriteServices = require('../services/favorite.services');

const addToFavorite = async (req, res, next) => {
    try {
        if (!req.user) {
            throw "User not available"
        }
        const { _id } = req.user;
        const { bookId } = req.body;
        const result = await favoriteServices.create(_id, bookId);
        return res.json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteFromFavorite = async (req, res, next) => {
    try {
        if (!req.user) {
            throw "User not available"
        }
        const { _id } = req.user;
        const { bookId } = req.params;
        await favoriteServices.deleteByBookId(_id, bookId);
        return res.json({
            message: 'Successfully deleted favorite'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addToFavorite,
    deleteFromFavorite
};