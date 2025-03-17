require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/client/index.route");
const database = require("./config/database");

const app = express();
const port = process.env.PORT || 3000; // Thêm giá trị mặc định nếu PORT không được định nghĩa

database.connect();
mongoose.connect(process.env.MONGO_URL);

app.set("view engine", "pug");
app.set("views", "./views"); // Đảm bảo thư mục 'views' tồn tại

app.use(express.json());
app.use(express.static("public")); // Phục vụ file tĩnh từ thư mục public

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
