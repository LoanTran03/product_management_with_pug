require("dotenv").config();
const express = require("express");
const route = require("./routes/client/index.route");

const app = express();
const port = process.env.PORT || 3000; // Thêm giá trị mặc định nếu PORT không được định nghĩa

app.set("view engine", "pug");
app.set("views", "./views"); // Đảm bảo thư mục 'views' tồn tại

app.use(express.json());
app.use(express.static("public")); // Phục vụ file tĩnh từ thư mục public

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
