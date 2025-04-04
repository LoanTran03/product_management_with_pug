const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: Boolean,
    position: Number,
    deleted: Boolean,
    deletedAt: Date
});


const Products = mongoose.model("products_managements", ProductsSchema, "products"); // model name, schema, collection name

module.exports = Products;