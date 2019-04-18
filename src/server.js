require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
// const mongoose = require('../src/dbConnect/mongoose');
// const mongodbsession = require('connect-mongodb-session')(session);
var session = require('express-session');
// var createError = require('http-errors');
const compression = require('compression');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const helmet = require('helmet');
var logger = require('morgan');
var path = require('path');
const csrf = require('csurf');
var app = express();
const port = process.env.PORT || 3000;
// Routes
var defaultRoute = require('../routes/defaultRoute');
var adminRoute = require('../routes/adminDashRoute');
var commonRoute = require('../routes/commonRoute');

// session db selection
// var store = new mongodbsession({
// uri: "",
// uri: '',
// collection: "session"
// });

// view engine setup
var csrfProtection = csrf();
app.use(express.static(path.join(__dirname, '../public')));
app.use(compression());
app.use(helmet());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(session({
//   secret: 'devil',
//   saveUninitialized: false,
//   resave: false,
//   store: store,
//   cookie: {
//     maxAge: 3600000
//   }
// }));
// app.use(csrfProtection);
app.use(flash());
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   res.locals.validate = req.session.validate;
//   res.locals.status = req.session.status;
//   next();
// });
app.use('/', defaultRoute);
app.use('/common/', commonRoute);
app.use('/admin/', adminRoute);
app.listen(port, function () {
    console.log("Server started at :", port);
});