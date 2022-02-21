const { userSchema } = require("./schemas")
const { Users } = require('../models/index');
const cryptograph = require("../utils/cryptoPassword");

const validateUser = (name, email, password, role) => {
  const { error } = userSchema.validate({name, email, password, role});
  if(error) throw error;

};

const newUser = async(name, email, password, role) => {
  const passwordCrypto = cryptograph(password);
  const user = await Users.create({ name, email, password: passwordCrypto, role });

  return user;
};

module.exports = {
  newUser,
  validateUser,
}