const reviewServices = require('../services/review.services');

const createReview = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({
                statusCode: 'failed_to_create_review',
                message: 'User not found!'
            });
        }
        const body = {
            ...req.body,
            user: req.user
        }
        const review = await reviewServices.create(body);
        return res.json(review);
    } catch (errors) {
        return res.json({
            errors
        })
    }
}

module.exports = {
    createReview
}