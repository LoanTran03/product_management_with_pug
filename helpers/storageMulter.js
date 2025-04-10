const multer = require("multer");
const path = require("path");

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public/uploads/products")); // fix an toàn
        },
        filename: function (req, file, cb) {
            const fileName = Date.now() + '-' + file.originalname.replace(/\s/g, '-');
            cb(null, fileName); // loại bỏ uniqueSuffix không có
        }
    });

    return storage;
};
