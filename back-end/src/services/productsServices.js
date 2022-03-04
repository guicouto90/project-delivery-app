const { products } = require('../database/models/index');
const { productNotFound } = require('../utils/errorMessages');
const errorConstructor = require('../utils/functions');
const { NOT_FOUND } = require('../utils/statusCodes');

const allProducts = async () => {
  const result = await products.findAll();

  return result;
};

const productById = async (id) => {
  const result = await products.findOne({
    where: { id },
  });

  return result;
};

const productsExist = async (productsDetails) => {
  await Promise.all(productsDetails.map(async (product) => {
    const { productId } = product;
    const result = await products.findByPk(productId);
    if (!result) {
      throw errorConstructor(NOT_FOUND, productNotFound);
    }
  }));
};

module.exports = {
  allProducts,
  productById,
  productsExist,
};
