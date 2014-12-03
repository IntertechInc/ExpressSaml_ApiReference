var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var config = require('config');
var unless = require('express-unless');
var ensureSaml2 = require('./authentication').ensureSaml2;
var ensureVersion = require('./version').ensureVersion;
var uuid = require('connect-uuid');

var tokens = require('./routes/token');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// Add UUID to request/response
app.use(uuid());
app.use(function(req, res, next) {
  res.header('Request-Id', req.uuid);
  next();
});

// Ensure API Version is requested
app.use(ensureVersion);

// Authentication of JWT and SAML2
app.use(jwt({
  secret: config.get('jwtKey')
}).unless({
  path: ['/token/saml']
}));

ensureSaml2.unless = unless;
app.use(ensureSaml2.unless({
  path: ['/token/saml']
}));

// Routes
app.use('/token', tokens);
app.use('/me', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});


module.exports = app;