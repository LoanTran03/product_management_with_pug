const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const path = require("path");
const MongoStore = require("connect-mongo");
dotenv.config();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");
const database = require("./config/connectDB");
const systemConfig = require("./config/system");

const app = express();
const isVercel = !!process.env.VERCEL;
const port = process.env.PORT || 3000;

// ✅ Dùng __dirname để trỏ đúng thư mục
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

console.log("🔗 Đang kết nối MongoDB...");
database.connect();

console.log("🔐 Khởi tạo middleware session + flash");
app.use(cookieParser("ABCDEF"));

// ✅ Đặt session trước flash()
app.use(session({
  secret: process.env.SESSION_SECRET || 'ABCDEF',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 14 * 24 * 60 * 60, // 14 ngày
  }),
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.successMesage = req.flash("successMesage");
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

console.log("📦 Setup routes...");
app.locals.prefixAdmin = systemConfig.PREFIX_ADMIN;
routeAdmin(app);
route(app);

console.log("✅ Khởi tạo hoàn tất");

// ✅ Nếu chạy local, dùng app.listen
if (!isVercel) {
  app.listen(port, () => {
    console.log(`🚀 App running at http://localhost:${port}`);
  });
}

// ✅ Nếu deploy lên Vercel, export app bằng serverless
module.exports = isVercel ? serverless(app) : app;
