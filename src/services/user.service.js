const { User } = require('../models');
const jwt = require('../utils/token');

// GET USER BY HIS EMAIL
const getByEmail = (Email) => User.findOne({
  attributes: ['id', 'email', 'password'],
  where: { Email },
});

// GET ALL OF THEM "USERS"
const getAllUsers = async () => {
  const users = await User.findAll(
    { attributes: { exclude: ['password'] } },
  );

  return users;
};

// GET USER BY HIS ID
const getUserById = async (idUser) => {
  const user = await User.findOne({ where: { id: idUser } });

  if (!user) {
    return { type: 404, message: 'User does not exist' };
  }

  const { id, displayName, email, image } = user;

  return { type: null, message: { id, displayName, email, image } };
};

// CREATE A NEW USER DATA
const createUser = async (data) => {
  const newUser = await User.create(data);
  const token = jwt.generateToken(newUser);
  // console.log(newUser('code'));
  // console.log(token);

  return token;
};

// REMOVE USER FROM DATA
const deleteUser = async (user) => {
  const { message } = await jwt.authenticateToken(user);
  const { email } = message;
  await User.destroy({ where: { email } });

  return { type: 204, message: 'Deleted' };
};

module.exports = {
  getByEmail,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
