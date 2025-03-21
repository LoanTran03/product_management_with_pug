const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    thumbnail: String,
    title: String,
    price: String,
    discount: String,
    status: Boolean
});


const Products = mongoose.model("products_managements", ProductsSchema, "products"); // model name, schema, collection name

module.exports = Products;