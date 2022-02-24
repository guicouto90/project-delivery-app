const { generateToken } = require("../middlewares/auth");
const { users, Login } = require("../models");
const cryptograph = require("../utils/cryptoPassword");
const { invalidPasswordEmail } = require("../utils/errorMessages");
const errorConstructor = require("../utils/functions");
const { UNAUTHORIZED } = require("../utils/statusCodes");
const { loginSchema } = require("./schemas")

const validateLogin = (email, password) => {
  const { error } = loginSchema.validate( { email, password });
  if(error) throw error;
};

const verifyLogin = async(email, password) => {
  const user = await users.findOne({ where: { email }});
  const passwordCrypto = cryptograph(password)
  if(!user || user.password !== passwordCrypto) {
    throw errorConstructor(UNAUTHORIZED, invalidPasswordEmail);
  };
  return user;
}

const newLogin = async (user) => {
  //await Login.create({ email, password });
  const { name, email, role } = user;
  const token = generateToken(email);
  const login = {
    name,
    email,
    token,
    role
  };
  
  return login;
};

module.exports = {
  validateLogin,
  verifyLogin,
  newLogin,
}