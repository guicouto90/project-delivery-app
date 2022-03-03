const express = require('express');
const { addUser, listAllUsers, listUsersByRole, deleteUserById } = require('../controllers/usersController');
const { validateToken } = require('../middlewares/auth');
const usersRouter = express.Router();


usersRouter.post('/', addUser);

usersRouter.get('/', listAllUsers);

usersRouter.get('/:role', listUsersByRole);

usersRouter.delete('/:id', validateToken, deleteUserById);

module.exports = usersRouter;
