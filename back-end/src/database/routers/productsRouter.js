const express = require('express');
const productsRouter = express.Router();

const {
  getAllProducts,
  getProductById,
  getImageProductByName,
} = require('../controllers/productsController');

productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.get('/images/:name', getImageProductByName);

module.exports = productsRouter;
