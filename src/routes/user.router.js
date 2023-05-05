const express = require('express');
const { UserController } = require('../controllers');
const authentications = require('../middlewares/authentications');

const route = express.Router();

route.post('/', authentications.newUserValidation, UserController.createUser);
route.get('/', authentications.authPass, UserController.getAllUsers);
route.get('/:id', authentications.authPass, UserController.getUserById);
route.delete('/me', authentications.authPass, UserController.deleteUser);

module.exports = route;
