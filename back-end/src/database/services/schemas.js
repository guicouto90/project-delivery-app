const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('seller','customer', 'administrator').required(),
});

module.exports = {
  userSchema,
}