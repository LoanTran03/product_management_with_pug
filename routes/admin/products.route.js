const express = require("express");
const route = express.Router();
const productControllerAdmin = require("../../controllers/admin/products.controller");

route.get("/", productControllerAdmin.index);
route.patch("/change-status/:status/:id", productControllerAdmin.changeStatus);
route.patch("/change-multiple-status", productControllerAdmin.changeStatusMulti);
route.delete("/delete-item/:id", productControllerAdmin.delete);

module.exports = route;