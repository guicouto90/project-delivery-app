const { Products } = require('../models');

const allProducts = async () => {
  const products = await Products.findAll();

  return products;
};

const productById = async (id) => {
  const product = await Products.findOne({
    where: { id },
  });

  return product;
};

module.exports = {
  allProducts,
  productById,
};
