const Product = require("../../models/products.model");

// [GET] /products
module.exports.index = async (req, res) => {
    const find = {
        status: "true"
    }
    const products = await Product.find(find);
    console.log(products);
    res.render("client/pages/product/index.pug", { 
        title: "Products",
        products: products
     });
}
  