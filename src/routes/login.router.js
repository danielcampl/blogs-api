const express = require('express');
const { LoginController } = require('../controllers');

const LoginRoutes = express.Router();

LoginRoutes.post('/', LoginController);

module.exports = LoginRoutes;
