const Product = require("../../models/products.model");
module.exports.index = async (req, res) => {
    const products = await Product.find();
    console.log(products);
    res.render("client/pages/product/index.pug", { 
        title: "Products",
        products: products
     });
}
  