const { sales } = require("../models/");
const { salesSchema } = require("./schemas");

const validateSale = (body) => {
  const { 
    user_id, 
    seller_id, 
    total_price, 
    delivery_address, 
    delivery_number, 
    status 
  } = body;
  const { error } = salesSchema.validate( {user_id, seller_id, total_price, delivery_address, delivery_number, status} );
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
  const {id} = await sales.create({ user_id, seller_id, total_price, delivery_address, delivery_number, sale_date, status });
  const result = {
    id,
    user_id, 
    seller_id, 
    total_price, 
    delivery_address, 
    delivery_number, 
    sale_date,
    status
  };

  return result;
};

const getAllSales = async() => {
  const result = await sales.findAll();

  return result;
};

const getSaleById = async() => {
  const result = await sales.findOne({ where: { id }});

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
  editSaleStatus
}