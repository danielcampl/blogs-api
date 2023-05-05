const { User, Category } = require('../models');
const { PostService } = require('../services');
const { authenticateToken } = require('../utils/token');

// USER VALIDATION
const newUserValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const user = await User.findOne({ where: { email } });
//  console.log(user);

  if (user) {
    return res.status(409)
   .json({ message: 'User already registered' });
  }
  if (displayName.length < 8) {
  return res.status(400)
  .json({ message: '"displayName" length must be at least 8 characters long' });
 }
  if (password.length < 6) {
   return res.status(400).json({ message: '"password" length must be at least 6 characters long' });
}
  if (!verifyEmail.test(email)) {
   return res.status(400).json({ message: '"email" must be a valid email' });
 }
  
  next();
};

// TOKEN AUTH
const authPass = async (req, res, next) => {
  const token = req.headers.authorization;
  
  const { type, message } = await authenticateToken(token);

  if (type) return res.status(type).json({ message });

  req.user = message;

  next();
};

// NAME VALIDATION USER
const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });

  return next();
};

// POST REQUIREMENTS VALIDATIONS
const postValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) { 
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }

  next();
};

// VALIDATIONS FROM NEW POST CREATED
const newPostValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const promisses = categoryIds.map(async (categoryId) => {
    const response = await Category.findByPk(categoryId);
    return response;
  });

  const allCategories = await Promise.all(promisses);
  const categoryExist = allCategories.every((category) => category);

  if (!categoryExist) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

// VALIDATION FOR UPDATES
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { content, title } = req.body;
  const { id: tokenId } = req.user;

  if (!id || !content || !title) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  const { message } = await PostService.getPostById(id);

  const postId = message.dataValues.userId;
  
  if (tokenId !== postId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  
  next();
};

module.exports = {
    newUserValidation,
    authPass,
    nameValidation,
    postValidation,
    newPostValidation,
    updatePost,
};