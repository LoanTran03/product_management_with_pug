require("dotenv").config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const express = require("express");

const methodOverride = require('method-override');
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
const database = require("./config/connectDB"); //test connect database
const systemConfig = require("./config/system"); ////////////////////////////////
const app = express();
const port = process.env.PORT || 3000; // Thêm giá trị mặc định nếu PORT không được định nghĩa
// Middleware để xử lý dữ liệu form (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
database.connect(); //test connect database
 
app.set("view engine", "pug");
app.set("views", "./views"); // Đảm bảo thư mục 'views' tồn tại

app.use(express.json());
app.use(express.static("public")); // Phục vụ file tĩnh từ thư mục public
app.use(methodOverride('_method')); // Override GET to POST, PUT, DELETE, PATCH  

app.use(cookieParser("ABCDEF")); // Middleware để phân tích cookie
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });
  

// prefixAdmin global variable
app.locals.prefixAdmin = systemConfig.PREFIX_ADMIN;
console.log(app.locals.prefixAdmin); // prefixAdmin



routeAdmin(app);
route(app);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
