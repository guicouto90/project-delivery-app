const { userSchema } = require("./schemas")
const { users } = require('../models/index');
const cryptograph = require("../utils/cryptoPassword");
const { CONFLICT } = require("../utils/statusCodes");
const { userExists } = require("../utils/errorMessages");
const errorConstructor = require("../utils/functions");

const validateUser = (name, email, password, role) => {
  const { error } = userSchema.validate({name, email, password, role});
  if(error) throw error;

};

const newUser = async(name, email, password, role) => {
  const passwordCrypto = cryptograph(password);
  const user = await users.create({ name, email, password: passwordCrypto, role });

  return user;
};

const verifyEmail = async(email, name) => {
  const userEmail = await users.findOne({ where: { email }});
  const userName = await users.findOne({ where: { name }});
  if(userEmail || userName) {
    throw errorConstructor(CONFLICT, userExists);
  };
};

const findAllUsers = async () => {
  const user = await users.findAll();

  return user;
}

const findUserByRole = async (role) => {
  const user = await users.findAll({
    attributes: { exclude: ['password']},
    where: { role },
  });

  return user;
}

module.exports = {
  newUser,
  validateUser,
  verifyEmail,
  findAllUsers,
  findUserByRole
}
