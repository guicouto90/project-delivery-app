const express = require('express');
const {
  addUser,
  listAllUsers,
  listUsersByRole,
} = require('../controllers/usersController');
const usersRouter = express.Router();

usersRouter.post('/', addUser);

usersRouter.get('/', listAllUsers);

usersRouter.get('/:role', listUsersByRole);

module.exports = usersRouter;
