const { Router } = require("express");
const userController = require('../controllers/user.controllers');
const checkJwt = require('../middleware/checkJwt');
const checkRoles = require('../middleware/checkRoles');
const Roles = require('../config/roles');

const router = Router()

router.get('/', checkJwt, checkRoles([Roles.ADMIN]), userController.getUsers);

router.get('/me', checkJwt, userController.getSelf)

router.post('/', checkJwt, checkRoles([Roles.ADMIN]), userController.addUser);

router.put('/:id', checkJwt, checkRoles([Roles.ADMIN]),  userController.updateUser);

router.put('/update/me', checkJwt, userController.updateSelf);

router.delete('/:id', checkJwt, checkRoles([Roles.ADMIN]),  userController.deleteUser);

module.exports = router;