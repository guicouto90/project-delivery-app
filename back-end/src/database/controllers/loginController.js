const { validateLogin, verifyLogin, newLogin } = require("../services/loginService");
const { CREATED, OK } = require("../utils/statusCodes");

const addLogin = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    validateLogin(email, password);
    const user = await verifyLogin(email, password);
    const result = await newLogin(user);

    return res.status(OK).json(result);
  } catch (error) {
   console.error(error.message);
   next(error); 
  }
};

module.exports = {
  addLogin,
}