const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const checkJwt = require('../middleware/checkJwt');

// router.get('/', (req, res) => {

// })

router.post('/', checkJwt, reviewController.createReview);

module.exports = router;