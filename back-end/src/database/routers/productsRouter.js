const express = require('express');
const productsRouter = express.Router();

const {
  getAllProducts,
  getProductById,
} = require('../controllers/productsController');

productsRouter.get('/', getAllProducts);
<<<<<<< HEAD

productsRouter.get('/:id', getProductById);

module.exports = productsRouter;
=======
productsRouter.get('/:id', getProductById);

module.exports = productsRouter;
>>>>>>> f223b72a0860aab9295a6d706aa20382f5a44852
