const express = require('express');

const productsRouter = express.Router();

const {
  getAllProducts,
  getProductById,
} = require('../controllers/productsController');

productsRouter.get('/', getAllProducts);

productsRouter.get('/:id', getProductById);

module.exports = productsRouter;
