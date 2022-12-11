const {Router} = require("express");

const route = Router();

route.use('/restaurants', require("./restaurants"))
route.use('/review', require("./review"))



module.exports = route;