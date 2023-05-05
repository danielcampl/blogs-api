const express = require('express');
const { PostController } = require('../controllers');
const authentications = require('../middlewares/authentications');

const route = express.Router();

route.post(
  '/',
  authentications.authPass,
  authentications.newPostValidation,
  PostController.createPost,
);
route.get('/', authentications.authPass, PostController.getPosts);
route.get('/:id', authentications.authPass, PostController.getPostById);
route.delete('/:id', authentications.authPass, PostController.deletePost);
route.put('/:id', authentications.authPass, authentications.updatePost, PostController.updatePost);

module.exports = route;
