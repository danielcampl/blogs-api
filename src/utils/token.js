const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'codelock';

// SOME OF THOSES TOKENS WERE TRANSFORM INTO AUTHENTICATIONS
const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateToken = (data) => {
  const { email, id } = data;
  const token = jwt.sign({ email, id }, secret, jwtConfig);

  return token;
};

const authenticateToken = async (token) => {
  if (!token) {
    return { type: 401, message: 'Token not found' };
  }

  try {
    const decoded = jwt.verify(token, secret);

    return { type: null, message: decoded };
  } catch (err) {
    return { type: 401, message: 'Expired or invalid token' };
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};