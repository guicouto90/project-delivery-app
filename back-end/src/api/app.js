const express = require('express');

const usersRouter = require('../database/routers/usersRouter');
const errorHandler = require('../database/middlewares/errorHandler');
const loginRouter = require('../database/routers/loginRouter');
const productsRouter = require('../database/routers/productsRouter');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/products', productsRouter);

app.use(errorHandler);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
