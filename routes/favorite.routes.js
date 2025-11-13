const express = require('express');
const Router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const checkJwt = require('../middleware/checkJwt');

Router.post('/', checkJwt, favoriteController.addToFavorite);

module.exports = Router;