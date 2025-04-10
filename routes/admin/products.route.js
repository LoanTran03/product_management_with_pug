const express = require("express");
const route = express.Router();
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });
const productControllerAdmin = require("../../controllers/admin/products.controller");
const validate = require("../../validate/admin/product.validate");

route.get("/", productControllerAdmin.index);
route.patch("/change-status/:status/:id", productControllerAdmin.changeStatus);
route.patch("/change-multiple", productControllerAdmin.changeStatusMulti);
route.delete("/delete-item/:id", productControllerAdmin.delete);
route.get("/create", productControllerAdmin.create);
route.post("/create", upload.single("thumbnail"), validate.createPost, productControllerAdmin.postCreate);
module.exports = route;