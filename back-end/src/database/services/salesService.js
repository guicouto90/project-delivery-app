const { sales, products, salesProducts } = require('../models/index');
const { productsExist } = require('./productsServices');
const { salesSchema, salesSchemaUpdate } = require('./schemas');

const validateSale = (body) => {
  const { 
    userId, 
    sellerId, 
    totalPrice, 
    deliveryAddress, 
    deliveryNumber, 
    status,
    productsDetails,
  } = body;
  const { error } = salesSchema.validate({ 
    userId, 
    sellerId, 
    totalPrice, 
    deliveryAddress, 
    deliveryNumber, 
    status, 
    productsDetails });
  if (error) throw error;
};

const validateSaleUpdate = (status) => {
  const { error } = salesSchemaUpdate.validate({ status });
  if (error) throw error;
};

const addSalesProducts = async (saleId, productsDetails) => {
  await Promise.all(productsDetails.map(async (productDetail) => {
    const { productId, quantity } = productDetail;
    await salesProducts.create({ sale_id: saleId, product_id: productId, quantity });
  }));
};

const newSale = async (body) => {
  validateSale(body);
  const { productsDetails } = body;
  await productsExist(productsDetails); // Verifica se os produtos existem;
  const saleDate = new Date().toISOString(); // adiciona a data no formato padrão exigido.

  const { id } = await sales.create({ 
    user_id: body.userId,
    seller_id: body.sellerId, 
    total_price: body.totalPrice,
    delivery_address: body.deliveryAddress,
    delivery_number: body.deliveryNumber,
    sale_date: saleDate,
    status: body.status,
  });
  await addSalesProducts(id, productsDetails); // adiciona os itens na tabela intermediaria de salesProducts;
  const result = await sales.findOne({ where: { id } });

  return result.dataValues;
};

const getAllSales = async () => {
  const result = await sales.findAll(
    { include: { model: products, as: 'products', through: { attributes: ['quantity'] } } },
  );

  return result;
};

const getSaleById = async (id) => {
  const result = await sales.findByPk(id,
    { include: { model: products, as: 'products', through: { attributes: ['quantity'] } },
  });
  
  return result;
};

const editSaleStatus = async (id, status) => {
  validateSaleUpdate(status);
  await sales.update(
    { status },
    { where: { id } },
  );

  return { message: `Sale Status updated for ${status}` };
};

module.exports = {
  validateSale,
  newSale,
  getAllSales,
  getSaleById,
  editSaleStatus,
  addSalesProducts,
};