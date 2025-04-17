const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware để upload file lên Cloudinary và gán vào req.body.thumbnail
module.exports.uploadToCloud = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
            if (error) {
                console.error("Upload error:", error);
                return res.status(500).json({ message: "Upload failed", error });
            }
            // Gán URL ảnh vào trường 'thumbnail' trong req.body
            req.body.thumbnail = result.secure_url;
            console.log("Uploaded URL (thumbnail):", req.body.thumbnail);
            next();
        }
    );

    // Đẩy buffer file vào stream
    streamifier.createReadStream(req.file.buffer).pipe(stream);
};
