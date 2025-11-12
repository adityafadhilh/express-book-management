const express = require('express');
const Router = express.Router();
const bookController = require('../controllers/book.controller');

Router.get('/', bookController.getBooks);

Router.post('/', bookController.addBook);

Router.put('/:id', bookController.updateBook);

Router.delete('/:id', bookController.deleteBook);

module.exports = Router;