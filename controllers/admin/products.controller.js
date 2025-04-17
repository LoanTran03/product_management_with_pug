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


        // title-asc, title-desc
        let sort = {};
        if(req.query.sort) {
            const sortData = req.query.sort.split("-");
            const field = sortData[0];
            const order = sortData[1] === "asc" ? 1 : -1;
            sort[field] = order;
        } else {
            sort.position = -1; // Mặc định sắp xếp theo position giảm dần
        }

        products = await Product.find(filter)
            .limit(objectPagination.limitItems)
            .skip(objectPagination.skip)
            .sort(sort)

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
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        title: "Create Product",
        product: null
    });
}
module.exports.postCreate = async (req, res) => {
    console.log(req.body);
    console.log("req.file");
    console.log(req.file);
    // Chuyển đổi giá trị và kiểm tra tính hợp lệ
    req.body.price = parseFloat(req.body.price);
    if (isNaN(req.body.price)) req.body.price = 0;  // Nếu không hợp lệ, gán giá trị mặc định

    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    if (isNaN(req.body.discountPercentage)) req.body.discountPercentage = 0;  // Nếu không hợp lệ, gán giá trị mặc định

    req.body.stock = parseInt(req.body.stock);
    if (isNaN(req.body.stock)) req.body.stock = 0;  // Nếu không hợp lệ, gán giá trị mặc định

    req.body.status = req.body.status === "active" ? true : false;

    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
        if (isNaN(req.body.position)) req.body.position = 0;  // Nếu không hợp lệ, gán giá trị mặc định
    } else {
        req.body.position = 0;  // Nếu không có vị trí, gán giá trị mặc định
    }
    console.log("req.body");

    // Kiểm tra xem có file không
    // if (req.file) {
    //     req.body.thumbnail = `/uploads/products/${req.file.filename}`; // đúng đường dẫn public
    // }
    

    console.log(req.body);

    const product = new Product(req.body);
    try {
        await product.save();
        req.flash("success", "Thêm sản phẩm thành công");
        res.redirect("/admin/products");
    } catch (error) {
        console.error(error);
        req.flash("error", "Lỗi khi tạo sản phẩm");
        res.redirect("/admin/products");
    }
} 
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    // deleted : false
    const product = await Product.findOne({_id: id, deleted: false});
    if(product){
        res.render("admin/pages/products/edit.pug", {
            title: "Edit Product",
            product: product
        })
    }
    else {
        req.flash("errorMessage", "Sản phẩm không tồn tại");
        res.redirect("/admin/products");
    }
}
module.exports.postEdit = async (req, res) => {
    const id = req.params.id;
    req.body.price = parseFloat(req.body.price);
    if (isNaN(req.body.price)) req.body.price = 0;  // Nếu không hợp lệ, gán giá trị mặc định

    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    if (isNaN(req.body.discountPercentage)) req.body.discountPercentage = 0;  // Nếu không hợp lệ, gán giá trị mặc định

    req.body.stock = parseInt(req.body.stock);
    if (isNaN(req.body.stock)) req.body.stock = 0;  // Nếu không hợp lệ, gán giá trị mặc định

    req.body.status = req.body.status === "active" ? true : false;

    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
        if (isNaN(req.body.position)) req.body.position = 0;  // Nếu không hợp lệ, gán giá trị mặc định
    } else {
        req.body.position = 0;  // Nếu không có vị trí, gán giá trị mặc định
    }

    if (req.file) {
        req.body.thumbnail = `/uploads/products/${req.file.filename}`; // đúng đường dẫn public
    }
    
    try {
        await Product.updateOne({_id: id}, req.body);
        req.flash("success", "Cập nhật sản phẩm thành công");
        // back
        res.redirect("/admin/products");
    } catch (error) {
        console.error(error);
        req.flash("error", "Lỗi khi cập nhật sản phẩm");
        res.redirect("/admin/products");
    }
}

module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({_id: id, deleted: false});
    if(product){
        res.render("admin/pages/products/detail.pug", {
            title: "Detail Product",
            product: product
        })
    }
    else {
        req.flash("errorMessage", "Sản phẩm không tồn tại");
        res.redirect("/admin/products");
    }
}