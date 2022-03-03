const { products } = require('../models');
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

const productsExist = async(productsDetails) => {
  await Promise.all(productsDetails.map(async (product) => {
    const { product_id } = product;
    const productId = await products.findByPk(product_id);
    if(!productId) {
      throw errorConstructor(NOT_FOUND, productNotFound);
    }
  }))
}

module.exports = {
  allProducts,
  productById,
  productsExist
};
