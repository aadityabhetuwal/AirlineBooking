const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config("./.env");

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
// const amadeus = require("./config/Amadeus");

const app = express();


app.listen(process.env?.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`)
})

app.use('*',
  cors({
    // origin: "http://localhost:5500",
    credentials: true,
  })
);

app.use(session({
  secret : "my secret",
  resave : false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 2 * 3600 * 1000,
    sameSite: "strict" // off CSRF
  } // set max age to 2 hours
}));

app.use(express.json({
  extended: false
}));

app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));

app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

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
