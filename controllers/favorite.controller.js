const favoriteServices = require('../services/favorite.services');

const addToFavorite = async (req, res) => {
    try {
        if (!req.user) {
            throw "User not available"
        }
        const {_id} = req.user;
        const { bookId } = req.body;
        const result = await favoriteServices.create(_id, bookId);
        return res.json({
            data: result,
        });
    } catch (err) {
        res.json({
            errors: err
        })
    }
}

module.exports = {
    addToFavorite
};