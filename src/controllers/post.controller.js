const { PostService } = require('../services');

// GET ALL POSTS
const getPosts = async (_req, res) => {
  const { message } = await PostService.getPosts();
  
  res.status(200).json(message);
};

// GET POST BY ITS ID REQUIRED
const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await PostService.getPostById(id);

  if (type) {
    return res.status(type).json({ message });
  }

  res.status(200).json(message);
};

// REMOVE THE POST SELECTED
const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { type, message } = await PostService.deletePost(id, userId);
  
  if (type) {
    return res.status(type).json({ message });
  }
  
  return res.status(204).json(message);
};

// CREATE A NEW POST FUNCTION
const createPost = async (req, res) => {
  const { user } = req;
  const { title, content, categoryIds } = req.body;
  const post = await PostService.createPost({ title, content, categoryIds, user });
  
  res.status(201).json(post);
};

// UPDATE CHANGE FROM POST USED
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { type, message } = await PostService.updatePost({ title, content, id });

  res.status(type).json(message);
};

module.exports = {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
};