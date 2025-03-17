const express = require("express");
const route = express.Router();
const homeController = require("../../controllers/client/home.controller.js");

route.get("/",homeController.index
);

module.exports = route;