const {
  validateUser,
  newUser,
  verifyEmail,
  findAllUsers,
  findUserByRole,
} = require("../services/usersServices");
const { CREATED, OK } = require("../utils/statusCodes");

const addUser = async(req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    validateUser(name, email, password, role);
    await verifyEmail(email, name);
    const result = await newUser(name, email, password, role);

    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const listAllUsers = async(req, res, next) => {
  try {
    const result = await findAllUsers();

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

const listUsersByRole = async(req, res, next) => {
  try {
    const { role } = req.params;

    const result = await findUserByRole(role);

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
}

module.exports = {
  addUser,
  listAllUsers,
  listUsersByRole,
}
