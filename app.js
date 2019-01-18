var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');     //change 1
//var angular = require('angular');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var myUsersRouter = require('./routes/myUsers');
/*  *///var bodyParser = require('body-parser'); */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({secret: 'ilovetelestax',
resave: true,
saveUninitialized: true}));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.bodyParser());
//app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
// app.use('/angular', express.static(__dirname + '/node_modules/angular/dist/')); 
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/myUsers',myUsersRouter);

//app.use for session     //change 2
app.use(session({secret: 'ilovetelestax',
resave: true,
saveUninitialized: true}));

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




//DEBUG=myapp:* npm start