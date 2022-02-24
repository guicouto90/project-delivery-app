const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRouter = require('../database/routers/usersRouter');
const errorHandler = require('../database/middlewares/errorHandler');
const loginRouter = require('../database/routers/loginRouter');
const productsRouter = require('../database/routers/productsRouter');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/products', productsRouter);

app.get('/images/:name', async (req, res, _next) => {
  const { name } = req.params;

  res.sendFile(path.join(__dirname, '../../public/images', name));
});

app.use(errorHandler);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
