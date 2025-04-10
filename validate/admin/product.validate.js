module.exports.createPost = (req, res, next) => {
    if(!req.file) {
        req.flash("errorMessage", "Có lỗi xảy ra khi tạo sản phẩm!");
        res.redirect("back");
        return;
    }
    if(!req.body.title) {
        req.flash("errorMessage", "Có lỗi xảy ra khi tạo sản phẩm!");
        res.redirect("back");
        return;
    }
    if(!req.body.title.length < 5) {
        req.flash("errorMessage", "Có lỗi xảy ra khi tạo sản phẩm!");
        res.redirect("back");
        return;
    }
    next();
}