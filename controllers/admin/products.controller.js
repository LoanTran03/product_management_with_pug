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
        const filter = {
            deleted: false
        };

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
        // position tang dan 

        products = await Product.find(filter)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip)
            .sort({ position: "desc" });

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

module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id:id}, {status: status});
    // SUCCESS ALERT
    req.flash("success", "Cập nhật trạng thái thành công");
    res.redirect("back");
};
// PATCH /admin/products/change-status/multiple 
// Cả thay đổi status và xóa nhiều sản phẩm
module.exports.changeStatusMulti = async (req, res) => {
    console.log("REQ.BODY:", req.body);  // Kiểm tra dữ liệu nhận được
    const ids = req.body.ids;  // Khai báo ids từ req.body
    const statusChange = req.body.statusChange;  // Khai báo statusChange từ req.body
    console.log("IDs:", ids);  // Kiểm tra ids
    console.log("Status Change:", statusChange);  // Kiểm tra statusChange
    // Kiểm tra nếu thiếu dữ liệu
    if (!ids || !statusChange) {
        return res.status(400).send("Thiếu dữ liệu");
    }
    const idsArray = ids.split(",").map((id) => id.trim());
    // 
    switch (statusChange) {
        case "active":
        case "inactive":
            // Cập nhật trạng thái cho các sản phẩm
            const isActive = (statusChange === "active" ? true : false);
            await Product.updateMany(
                { _id: { $in: idsArray } },
                { status: isActive }
            );
            req.flash("success", "Cập nhật trạng thái nhiều sản phẩm thành công");
            break;
        case "delete":
            // Xóa nhiều sản phẩm trong trường hợp xóa cứng
            // await Product.deleteMany({ _id: { $in: idsArray } });
            // Xóa mềm
            await Product.updateMany(
                { _id: { $in: idsArray } },
                {
                    deleted: true,
                    deletedAt: Date.now()
                }
            );
            req.flash("success", "Xóa nhiều sản phẩm thành công");
            break;
        case "change-position":
            // Thay đổi vị trí cho các sản phẩm
            for (let i = 0; i < idsArray.length; i++) {
                const [id, position] = idsArray[i].split("-");
                await Product.updateOne(
                    { _id: id },
                    { position: parseInt(position) }
                );
            }
            req.flash("success", "Cập nhật vị trí thành công");
            break;
        default:
            return res.status(400).send("Trạng thái không hợp lệ");
    }
    res.redirect('back');
};
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    // await Product.deleteOne({_id:id});
    await Product.updateOne({_id:id}, {
        deleted: true,
        deletedAt: Date.now()
    }); // Xóa mềm
    req.flash("success", "Xóa sản phẩm thành công");
    res.redirect('back');
}