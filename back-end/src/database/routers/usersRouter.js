const express = require('express');
const { addUser, listAllUsers } = require('../controllers/usersController');
const usersRouter = express.Router();

usersRouter.post('/', addUser);

usersRouter.get('/', listAllUsers);

module.exports = usersRouter;