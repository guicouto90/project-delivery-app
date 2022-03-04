const express = require('express');
const { 
  addSales, 
  listSales, 
  listSaleById, 
  updateSaleStatus, 
} = require('../controllers/salesController');
const { validateToken } = require('../middlewares/auth');

const salesRouter = express.Router();

salesRouter.post('/', validateToken, addSales);

salesRouter.get('/', listSales);

salesRouter.get('/:id', listSaleById);

salesRouter.put('/:id', updateSaleStatus);

module.exports = salesRouter;