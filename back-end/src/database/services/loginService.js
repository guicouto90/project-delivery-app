const { generateToken } = require('../../middlewares/auth');
const { users } = require('../models/index');
const cryptograph = require('../../utils/cryptoPassword');
const { invalidPasswordEmail } = require('../../utils/errorMessages');
const errorConstructor = require('../../utils/functions');
const { NOT_FOUND } = require('../../utils/statusCodes');
const { loginSchema } = require('./schemas');

const validateLogin = (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw error;
};

const verifyLogin = async (email, password) => {
  const user = await users.findOne({ where: { email } });
  const passwordCrypto = cryptograph(password);
  if (!user || user.password !== passwordCrypto) {
    throw errorConstructor(NOT_FOUND, invalidPasswordEmail);
  }
  return user;
};

const newLogin = async (email, password) => {
  validateLogin(email, password);
  const { name, role } = await verifyLogin(email, password);
  const { id } = await users.findOne({ where: { email } });
  const token = generateToken(email);
  const login = {
    id,
    name,
    email,
    role,
    token,
  };
  
  return login;
};

module.exports = {
  validateLogin,
  verifyLogin,
  newLogin,
};