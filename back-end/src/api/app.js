const express = require('express');
const cors = require('cors');
const usersRouter = require('../database/routers/usersRouter');
const errorHandler = require('../database/middlewares/errorHandler');
const loginRouter = require('../database/routers/loginRouter');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use(errorHandler);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
