const express = require('express');
const { addSales, listSales, listSaleById, updateSaleStatus } = require('../controllers/salesController');
const salesRouter = express.Router();

salesRouter.post('/', addSales);

salesRouter.get('/', listSales);

salesRouter.get('/:id', listSaleById);

salesRouter.put('/:id', updateSaleStatus)

module.exports = salesRouter;