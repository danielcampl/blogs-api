const { Router } = require('express');
const { CategoryController } = require('../controllers');
const authentications = require('../middlewares/authentications');

const route = Router();

route.get('/', authentications.authPass, CategoryController.getAllCategories);
route.post(
  '/', 
  authentications.authPass,
  authentications.nameValidation, 
  CategoryController.createCategory,
);

module.exports = route;