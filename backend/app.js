var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 公開ディレクトリはclient内のdist
var public_dir = path.join(__dirname, '../client/dist')
app.use(express.static(public_dir));

// APIリクエスト制御
(function() {
  var jwt = require('express-jwt');
  var secret = require("fs").readFileSync('private.key');
  var api = require('./routes/api');
  var jwtCheck = jwt({
    secret: secret,
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring (req) {
      console.log( "req.headers", req.headers );
      console.log( "req.query", req.query );
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
  });
  
  app.use('/api', jwtCheck, api);
  
})();

// 公開ディレクトリに存在しないファイル、
// またはルーティング設定していないリクエストの制御
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log( "koko error dev", err );
    res.json(err)
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.json(err.message)
  console.log( "koko error", err );
  res.json(err)
});


module.exports = app;
