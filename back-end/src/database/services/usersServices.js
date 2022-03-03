const { userSchema } = require("./schemas")
const { users } = require('../models/index');
const cryptograph = require("../utils/cryptoPassword");
const { CONFLICT, NO_CONTENT, UNAUTHORIZED } = require("../utils/statusCodes");
const { userExists, userNotExists, unauthorized } = require("../utils/errorMessages");
const errorConstructor = require("../utils/functions");
const { generateToken } = require("../middlewares/auth");

const validateUser = (name, email, password, role) => {
  const { error } = userSchema.validate({name, email, password, role});
  if(error) throw error;

};

const newUser = async(name, email, password, role) => {
  const passwordCrypto = cryptograph(password);
  const token = generateToken(email);
  const { id } = await users.create({ name, email, password: passwordCrypto, role });
  const login = {
    id,
    name,
    email,
    role,
    token,
  };

  return login;
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

const deleteById = async (id, userEmail) => {
  const findUserByIdDelete = await users.findOne({ where: { id } });
  
  if (!findUserByIdDelete) throw errorConstructor(NO_CONTENT, userNotExists);

  const findUserAdmin = await users.findOne({ where: { email: userEmail } });

  if (findUserAdmin.role !== 'administrator') throw errorConstructor(UNAUTHORIZED, unauthorized);

  const userDeleted = await users.destroy({ where: { id } });

  return userDeleted;
}

module.exports = {
  newUser,
  validateUser,
  verifyEmail,
  findAllUsers,
  findUserByRole,
  deleteById,
}
