var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var users = require('./routes/user');// 追加
var shops = require('./routes/shop');  // 追加

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ## ここから追加 ##
var mysql   = require("mysql");
var pool = mysql.createPool({
  connectionLimit : 10,
  host: process.env.NODE_DB_HOST || 'localhost',
  // port: process.env.NODE_DB_PORT || '3306',
  user: process.env.NODE_DB_USER || 'user',
  password: process.env.NODE_DB_PASS || 'password',
  database: process.env.NODE_DB_NAME || 'crypteat'
});
pool.on('connection', function (connection) {
  console.log("新しいコネクションプールが作成されました");
});
pool.on('acquire', function (connection) {
  console.log("コネクションプールから接続が獲得されました");
});
pool.on('release', function () {
  console.log("コネクションプールが戻されました");
});
pool.on('enqueue', function () {
  console.log("エンキュー");
});
global.pool = pool;
// ## ここまで ##

//CORS対策のために追加　axiosからアクセスさせるためのミドルウェア
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/shop', shops);                // 追加
app.use('/login', users);      


// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});

module.exports = app;