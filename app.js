const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fetch = require('node-fetch');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session)
const client = redis.createClient()

const indexRouter = require('./routes/index');
const auctionRouter = require('./routes/auction');
const usersRouter = require('./routes/user');
const mapRouter = require('./routes/map');

const app = express();

// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/map', { useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new RedisStore({
        client,
        host: 'localhost',
        port: 3000,
        ttl: 260,
    }),
    key: 'user_sid',
    secret: 'oh klahoma',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    }
}))

app.use('/', indexRouter);
app.use('/auction', auctionRouter);
app.use('/user', usersRouter);
app.use('/map', mapRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;