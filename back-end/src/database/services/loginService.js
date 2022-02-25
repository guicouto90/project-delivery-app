const { generateToken } = require("../middlewares/auth");
const { users } = require("../models");
const cryptograph = require("../utils/cryptoPassword");
const { invalidPasswordEmail } = require("../utils/errorMessages");
const errorConstructor = require("../utils/functions");
<<<<<<< HEAD
const { NOT_FOUND } = require("../utils/statusCodes");
=======
const { UNAUTHORIZED, NOT_FOUND } = require("../utils/statusCodes");
>>>>>>> f223b72a0860aab9295a6d706aa20382f5a44852
const { loginSchema } = require("./schemas")

const validateLogin = (email, password) => {
  const { error } = loginSchema.validate( { email, password });
  if(error) throw error;
};

const verifyLogin = async(email, password) => {
  const user = await users.findOne({ where: { email }});
  const passwordCrypto = cryptograph(password)
  if(!user || user.password !== passwordCrypto) {
    throw errorConstructor(NOT_FOUND, invalidPasswordEmail);
  };
  return user;
}

const newLogin = async (user) => {
  const { name, email, role } = user;
  const token = generateToken(email);
  const login = {
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
}