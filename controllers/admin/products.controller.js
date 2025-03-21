// [GET] /admin/products
const Product = require("../../models/products.model");
module.exports.index = async (req, res) => {
    console.log(req.query.status);
    const find = {};
    if(req.query.status){
        find.status = req.query.status === "active" ? true : false;
    }
    const products = await Product.find(find);
    console.log(products);
    res.render("admin/pages/products/index.pug", { 
        title: "Products",
        products: products
    });
};