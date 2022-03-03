const { product } = require("puppeteer");
const { sales, products, salesProducts } = require("../models/");
const { salesSchema } = require("./schemas");

const validateSale = (body) => {
  const { 
    user_id, 
    seller_id, 
    total_price, 
    delivery_address, 
    delivery_number, 
    status,
    productsDetails
  } = body;
  const { error } = salesSchema.validate( {user_id, seller_id, total_price, delivery_address, delivery_number, status, productsDetails} );
  if(error) throw error;
}

const newSale = async(body) => {
  const { 
    user_id, 
    seller_id, 
    total_price, 
    delivery_address, 
    delivery_number, 
    status 
  } = body;
  const sale_date = new Date().toISOString();
  const { id } = await sales.create({ user_id, seller_id, total_price, delivery_address, delivery_number, sale_date, status });

  return id;
};

const addSalesProducts = async(sale_id, productsDetails) => {
  await Promise.all(productsDetails.map(async (productDetail) => {
    const { product_id, quantity } = productDetail;
    await salesProducts.create({ sale_id, product_id, quantity })
  }));
}

const getAllSales = async() => {
  const result = await sales.findAll(
    { include: { model: products, as: 'products', through: { attributes: ['quantity'] } } }
  );

  return result;
};

const getSaleById = async(id) => {
  const result = await sales.findByPk(id,
    { include: { model: products, as: 'products', through: { attributes: ['quantity'] } },
  });
  
  return result;
};

const editSaleStatus = async(id, status) => {
  await sales.update(
    { status },
    { where: { id }}
  );

  return { message: `Sale Status updated for ${status}`}
}

module.exports = {
  validateSale,
  newSale,
  getAllSales,
  getSaleById,
  editSaleStatus,
  addSalesProducts
}