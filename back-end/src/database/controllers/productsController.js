const { allProducts, productById } = require('../services/productsServices');
const { OK } = require('../utils/statusCodes');

<<<<<<< HEAD
const getAllProducts = async(req, res, next) => {
=======
const getAllProducts = async(_req, res, next) => {
>>>>>>> f223b72a0860aab9295a6d706aa20382f5a44852
  try {
    const products = await allProducts();
    
    return res.status(OK).json(products);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productById(id);

    return res.status(OK).json(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
<<<<<<< HEAD
}
=======
}
>>>>>>> f223b72a0860aab9295a6d706aa20382f5a44852
