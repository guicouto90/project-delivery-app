const { newSale, getAllSales, editSaleStatus, getSaleById } = require('../services/salesService');
const { CREATED, OK } = require('../../utils/statusCodes');

const addSales = async (req, res, next) => {
  try {
    const result = await newSale(req.body);

    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listSales = async (req, res, next) => {
  try {
    const result = await getAllSales();

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const listSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSaleById(id);

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const updateSaleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await editSaleStatus(id, status);

    return res.status(OK).json(result);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

module.exports = {
  listSales,
  addSales,
  listSaleById,
  updateSaleStatus,
};