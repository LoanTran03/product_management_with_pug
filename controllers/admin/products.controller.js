const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");
const paginationHelper = require("../../helpers/pagination.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    try {
        console.log(req.query);
        
        const filterStatus = filterStatusHelper(req.query);
        const searchData = searchHelper(req.query);
        const filter = {};

        // Lọc theo trạng thái
        if (req.query.status === "active" || req.query.status === "inactive") {
            filter.status = req.query.status === "active";
        }

        // Tìm kiếm theo tiêu đề
        if (searchData.regex) {
            filter.title = searchData.regex;
        }

        let products;
        let objectPagination = null;

        const productsCount = await Product.countDocuments(filter);
        objectPagination = paginationHelper(req.query.page, productsCount);
        products = await Product.find(filter)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip);

        res.render("admin/pages/products/index.pug", { 
            title: "Products",
            products: products,
            filterStatus: filterStatus,
            searchInput: searchData.search,
            pagination: objectPagination
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
};

// [GET] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id:id}, {status: status});
    res.redirect('back');
};