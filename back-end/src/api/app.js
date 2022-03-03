const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('../database/middlewares/errorHandler');
const usersRouter = require('../database/routers/usersRouter');
const loginRouter = require('../database/routers/loginRouter');
const productsRouter = require('../database/routers/productsRouter');
const salesRouter = require('../database/routers/salesRouter');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.get('/images/:name', async (req, res, _next) => {
  const { name } = req.params;

  res.sendFile(path.join(__dirname, '../../public/images', name));
});

app.use(errorHandler);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
