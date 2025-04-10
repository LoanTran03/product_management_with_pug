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
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},
{
    timestamps: true // Tạo trường createdAt và updatedAt
});


const Products = mongoose.model("products_managements", ProductsSchema, "products"); // model name, schema, collection name

module.exports = Products;