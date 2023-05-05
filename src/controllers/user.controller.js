const { UserService } = require('../services');

// CREATE NEW USER LOGIN
const createUser = async (req, res) => {
  const token = await UserService.createUser(req.body);

  return res.status(201).json({ token });
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();

  return res.status(200).json(users);
};

// GET A USER BY HIS ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await UserService.getUserById(id);
  
  if (type) {
    return res.status(type).json({ message });
  }
  
  return res.status(200).json(message);
};

// REMOVE THE USER DATA
const deleteUser = async (req, res) => {
  const { authorization } = req.headers;
  const { type } = await UserService.deleteUser(authorization);

  res.status(type).end();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};