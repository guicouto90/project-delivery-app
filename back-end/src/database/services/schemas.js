const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('seller','customer', 'administrator').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const salesSchema = Joi.object({
  user_id: Joi.number().min(1).strict().required(),
  seller_id: Joi.number().min(1).strict().required(),
  total_price: Joi.number().min(1).strict().required(),
  delivery_address: Joi.string().not().empty().required(),
  delivery_number: Joi.number().min(1).strict().required(),
  status: Joi.string().valid('Pendente', 'Entregue', 'Preparando', 'Em Trânsito').required(),
  productsDetails: Joi.array().items(Joi.object({
    product_id: Joi.number().integer().strict().required(),
    quantity: Joi.number().integer().strict().required(),
  }).required()).required()
});

const salesSchemaUpdate = Joi.object({
  status: Joi.string().valid('Pendente', 'Entregue', 'Preparando', 'Em Trânsito').required(),
})

module.exports = {
  userSchema,
  loginSchema,
  salesSchema,
  salesSchemaUpdate
}