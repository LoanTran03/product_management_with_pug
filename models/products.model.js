const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    thumbnail: String,
    title: String,
    price: Number,
    discount: Number
});

const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product;