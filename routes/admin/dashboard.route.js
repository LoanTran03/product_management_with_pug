const express = require("express");
const route = express.Router();
const controllerAdmin = require("../../controllers/admin/dashboard.controller");

route.get("/", controllerAdmin.index);

module.exports = route; 