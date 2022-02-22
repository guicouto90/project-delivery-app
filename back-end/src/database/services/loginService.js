const { generateToken } = require("../middlewares/auth");
const {Users, Login} = require("../models");
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
  const user = await Users.findOne({ email });
  console.log(user.password)
  const passwordCrypto = cryptograph(password)
  if(!user || user.password !== passwordCrypto) {
    throw errorConstructor(UNAUTHORIZED, invalidPasswordEmail);
  }
}

const newLogin = async (email, password) => {
  //await Login.create({ email, password });
  const token = generateToken(email);

  return token;
};

module.exports = {
  validateLogin,
  verifyLogin,
  newLogin,
}