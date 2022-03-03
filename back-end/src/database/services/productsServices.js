const { products } = require('../models');

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

module.exports = {
  allProducts,
  productById,
};
