const express = require('express');
const usersRouter = require('../database/routers/usersRouter');
const errorHandler = require('../database/utils/errorHandler');

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.use(errorHandler);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
