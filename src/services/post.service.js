const { PostCategory, BlogPost, Category, User } = require('../models');

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    return { type: 404, message: 'Post does not exist' };
  }
  
  return { type: null, message: post };
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  
  if (!post) {
    return { type: 404, message: 'Post does not exist' };
  }
  
  if (post.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  await BlogPost.destroy({ where: { id } });

  return { type: null, message: '' };
};

const createPost = async ({ title, content, categoryIds, user }) => {
  const { id: userId } = user;
  const createdPost = await BlogPost.create({ title, content, userId });
  const { id } = createdPost;
  const promisses = categoryIds.map(async (category) => {
    const formated = { categoryId: category, postId: id };
    
    await PostCategory.create(formated);
  });
  
  await Promise.all(promisses);
  
  return { ...createdPost.dataValues, userId, id };
};

const updatePost = async ({ title, content, id }) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const { message } = await getPostById(id);
  
  return { type: 200, message }; 
};

module.exports = {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
};
