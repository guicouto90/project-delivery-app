const { validateLogin, verifyLogin, newLogin } = require("../services/loginService");
<<<<<<< HEAD
const { OK } = require("../utils/statusCodes");
=======
const { CREATED, OK } = require("../utils/statusCodes");
>>>>>>> f223b72a0860aab9295a6d706aa20382f5a44852

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