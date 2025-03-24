const Product = require("../../models/products.model");
const filterStatusHelper = require("../../helpers/filterStatus.js");
module.exports.index = async (req, res) => {
    try {
        const filterStatus = filterStatusHelper(req.query);
        // console.log('filterStatus', filterStatus);
        
        const { status, search } = req.query;
        const filter = {};

        // Lọc theo trạng thái
        if (status === "active" || status === "inactive") {
            filter.status = status === "active";
        }

        // Tìm kiếm theo tiêu đề
        if (search) {
            filter.title = { $regex: new RegExp(search, "i") }; // Không phân biệt hoa thường
        }

        console.log("Filter Conditions:", filter);

        const products = await Product.find(filter);

        if (!products.length) {
            console.log("No products found.");
        }

        res.render("admin/pages/products/index.pug", { 
            title: "Products",
            products: products,
            // query: req.query  // 👈 Thêm dòng này để truyền query vào Pug
            filterStatus: filterStatus,
            searchInput: search
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
};
