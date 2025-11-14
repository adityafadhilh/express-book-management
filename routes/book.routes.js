const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const checkJwt = require('../middleware/checkJwt');
const checkRoles = require('../middleware/checkRoles');
const Roles = require('../config/roles');

router.get('/', bookController.getBooks);

router.post('/', checkJwt, checkRoles([Roles.ADMIN]), bookController.addBook);

router.put('/:id', checkJwt, checkRoles([Roles.ADMIN]), bookController.updateBook);

router.delete('/:id', checkJwt, checkRoles([Roles.ADMIN]), bookController.deleteBook);

module.exports = router;
