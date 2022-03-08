const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const errorHandler = require('../middlewares/errorHandler');
const usersRouter = require('../routers/usersRouter');
const loginRouter = require('../routers/loginRouter');
const productsRouter = require('../routers/productsRouter');
const salesRouter = require('../routers/salesRouter');

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

const httpServer = http.createServer(app);

module.exports = httpServer;
