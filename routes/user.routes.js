const { Router } = require("express");
const userController = require('../controllers/user.controllers');
const checkJwt = require('../middleware/checkJwt');
const checkRoles = require('../middleware/checkRoles');
const Roles = require('../helpers/roles');

const router = Router()

router.get('/', checkJwt, checkRoles([Roles.ADMIN]), userController.getUsers);

router.get('/me', checkJwt, checkRoles([Roles.ADMIN, Roles.USER]), userController.getSelf)

router.post('/', checkJwt, checkRoles([Roles.ADMIN]), userController.addUser);

router.put('/:id', checkJwt, checkRoles([Roles.ADMIN]),  userController.updateUser);

router.put('/update/me', checkJwt, checkRoles([Roles.ADMIN, Roles.USER]), userController.updateSelf);

router.delete('/:id', checkJwt, checkRoles([Roles.ADMIN]),  userController.deleteUser);

module.exports = router;