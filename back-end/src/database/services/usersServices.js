const { userSchema } = require("./schemas")
const { Users } = require('../models/index');
const cryptograph = require("../utils/cryptoPassword");
const { BAD_REQUEST, CONFLICT } = require("../utils/statusCodes");
const { userExists } = require("../utils/errorMessages");
const errorConstructor = require("../utils/functions");

const validateUser = (name, email, password, role) => {
  const { error } = userSchema.validate({name, email, password, role});
  if(error) throw error;

};

const newUser = async(name, email, password, role) => {
  const passwordCrypto = cryptograph(password);
  const user = await Users.create({ name, email, password: passwordCrypto, role });

  return user;
};

const verifyEmail = async(email) => {
  const user = await Users.findOne({ email: { email } });
  if(user) {
    throw errorConstructor(CONFLICT, userExists);
  };
}

module.exports = {
  newUser,
  validateUser,
  verifyEmail,
}