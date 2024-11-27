let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
let cors = require('cors');
//Create user model instance
let userModel = require('../model/User');
let User = userModel.User;
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let bookRouter = require('../routes/book');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
let session = require('express-session')
let passport = require('passport')
let passportLocal = require('passport-local')
let flash = require('connect-flash');
passport.use(User.createStrategy());
let localStrategy = passportLocal.Strategy;

// getting-started.js
const mongoose = require('mongoose');
let DB = require('./db');
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{console.log("Connected with MongoDB")});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true});

// Set up express-session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized: false,
  resave: false
}));
// Initialize the flash
app.use(flash());
// serialize and deserializse the user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

/*main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://rayyanmalik:Malik23@cluster0.0fcz9.mongodb.net/');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}*/

//Model View Controller (MVC)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', bookRouter);

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
  res.render('error', {title: 'Error'});
});

module.exports = app;
