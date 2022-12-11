const Joi = require('joi')
//* Include all validators
const Validators = require('./../validations')
// console.log(Validators.hasOwnProperty("restaurants"));
const {restaurantSchema} = require('./../validations/reataurantValidation')
const validate = (validator)=>{
    // console.log(validator);
    return async function(req,res,next) {
        try {
            console.log("insdie try");
            await Validators[validator].validateAsync(req.body,{abortEarly:false});
            next()
          }
          catch (error) {
            res.status(422).json({
                status:"fail",
                error
            })
          }
    }
}
module.exports = {
    validate
}