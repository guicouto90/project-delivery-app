const { validateUser, newUser } = require("../services/usersServices");
const { CREATED } = require("../utils/statusCodes");

const addUser = async(req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    validateUser(name, email, password, role);
    const result = await newUser(name, email, password, role);

    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  addUser,
}