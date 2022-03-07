const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('seller', 'customer', 'administrator').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const salesSchema = Joi.object({
  userId: Joi.number().min(1).strict().required(),
  sellerId: Joi.number().min(1).strict().required(),
  totalPrice: Joi.number().min(1).strict().required(),
  deliveryAddress: Joi.string().not().empty().required(),
  deliveryNumber: Joi.number().min(1).strict().required(),
  status: Joi.string().valid('Pendente', 'Entregue', 'Preparando', 'Em Trânsito').required(),
  productsDetails: Joi.array().items(Joi.object({
    productId: Joi.number().integer().strict().required(),
    quantity: Joi.number().integer().strict().required(),
  }).required()).required(),
});

const salesSchemaUpdate = Joi.object({
  status: Joi.string().valid('Pendente', 'Entregue', 'Preparando', 'Em Trânsito').required(),
});

module.exports = {
  userSchema,
  loginSchema,
  salesSchema,
  salesSchemaUpdate,
};