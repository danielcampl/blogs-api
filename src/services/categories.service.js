const { Category } = require('../models');

// CREATE NEW CATEGORY
const createCategory = async (name) => {
  const response = await Category.create({ name });

  return response;
};

// GET ALL OF THEM
const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};