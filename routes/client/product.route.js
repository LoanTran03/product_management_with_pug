const express = require("express");
const route = express.Router();
const productsController = require("../../controllers/client/products.cotroller.js");

route.get("/", productsController.index);

module.exports = route;