const { validateLogin, verifyLogin, newLogin } = require("../services/loginService");
const { CREATED } = require("../utils/statusCodes");

const addLogin = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    validateLogin(email, password);
    await verifyLogin(email, password);
    const token = await newLogin(email, password);

    return res.status(CREATED).json({token});
  } catch (error) {
   console.error(error.message);
   next(error); 
  }
};

module.exports = {
  addLogin,
}