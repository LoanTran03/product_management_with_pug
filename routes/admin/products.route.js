const express = require("express");
const route = express.Router();
const productControllerAdmin = require("../../controllers/admin/products.controller");

route.get("/", productControllerAdmin.index);
route.patch("/change-status/:status/:id", productControllerAdmin.changeStatus);

module.exports = route;