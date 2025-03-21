const dashboardRoute = require('./dashboard.route');
const productRoute = require('./products.route');

module.exports = (app) => {
    app.use(app.locals.prefixAdmin + "/dashboard", dashboardRoute);
    app.use(app.locals.prefixAdmin + "/products", productRoute);
}