const express = require('express');
const reviewController = require('./../controller/review')
const router = express.Router();

router.post('/:restuarant_id',reviewController.addReview)



module.exports = router;