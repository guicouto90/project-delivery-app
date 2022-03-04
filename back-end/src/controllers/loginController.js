const { newLogin } = require('../services/loginService');
const { OK } = require('../utils/statusCodes');

const addLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await newLogin(email, password);

    return res.status(OK).json(result);
  } catch (error) {
   console.error(error.message);
   next(error); 
  }
};

module.exports = {
  addLogin,
};