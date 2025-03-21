const dashboardRoute = require('./dashboard.route');

module.exports = (app) => {
    app.use(app.locals.prefixAdmin + "/dashboard", dashboardRoute);
}