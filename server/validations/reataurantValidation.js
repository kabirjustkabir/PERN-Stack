const Joi = require('joi');


const restaurantSchema =  Joi.object({
    name: Joi.string().min(5).max(50).required(),
    location: Joi.string().min(5).max(50).required(),
    price_range: Joi.number().integer().min(1).max(5),
})

module.exports = restaurantSchema