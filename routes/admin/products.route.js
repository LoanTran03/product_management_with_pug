const express = require("express");
const route = express.Router();
const productControllerAdmin = require("../../controllers/admin/products.controller");

route.get("/", productControllerAdmin.index);

module.exports = route;