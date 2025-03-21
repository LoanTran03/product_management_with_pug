// [GET] /admin/products
const Product = require("../../models/products.model");
module.exports.index = async (req, res) => {
    const products = await Product.find();
    res.render("admin/pages/products/index.pug", { 
        title: "Products",
        products: products
    });
};