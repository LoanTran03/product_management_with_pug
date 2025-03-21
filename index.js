require("dotenv").config();
const express = require("express");
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
const database = require("./config/connectDB"); //test connect database
const systemConfig = require("./config/system"); ////////////////////////////////
const app = express();
const port = process.env.PORT || 3000; // Thêm giá trị mặc định nếu PORT không được định nghĩa

database.connect(); //test connect database
 
app.set("view engine", "pug");
app.set("views", "./views"); // Đảm bảo thư mục 'views' tồn tại

app.use(express.json());
app.use(express.static("public")); // Phục vụ file tĩnh từ thư mục public

// prefixAdmin global variable
app.locals.prefixAdmin = systemConfig.PREFIX_ADMIN;
console.log(app.locals.prefixAdmin); // prefixAdmin

routeAdmin(app);
route(app);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
