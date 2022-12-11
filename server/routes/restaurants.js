const express = require('express');

const router = express.Router();

const restaurantsController = require('./../controller/restaurants')
const {validate} = require('./../middleware/joiMiddleware')

router.
    route('/').
    get(restaurantsController.getAllRestaurants)
    .post(validate('restaurant'),restaurantsController.postRestaurant)


router.
    route('/:id').
    get(restaurantsController.getSingleRestaurant)
    .put(validate('restaurant'),restaurantsController.updateRestaurant)
    .delete(restaurantsController.deleteRestaurant)



module.exports = router;