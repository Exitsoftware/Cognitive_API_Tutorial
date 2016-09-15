var express = require('express');
var http = require('http');
var request = require('request');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


console.log('Server Start');


var requestBody = {'url': 
'https://s-media-cache-ak0.pinimg.com/736x/09/6b/10/096b101cd34c08b79bb0e6aec2b3afb5.jpg'
};

request.post({
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    method: 'POST',
    host: 'api.projectoxford.ai',
    body: JSON.stringify(requestBody),
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '7ff4dabe4c274faab2f9de338a66a326',
    }
}, function(err, res, body){
    console.log(res.body);
})

//function PostCode() {
//  console.log('post!');
//
//  // An object of options to indicate where to post to
//  var post_options = {
//      url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
//      host: 'api.projectoxford.ai',
//      method: 'POST',
//      headers: {
//          'Content-Type': 'application/json',
//          'Ocp-Apim-Subscription-Key': '7ff4dabe4c274faab2f9de338a66a326'
//      }
//  };
//
//  // Set up the request
//  var post_req = http.request(post_options, function(res) {
//      console.log('post!!!!');
//      res.setEncoding('utf8');
//      res.on('data', function (chunk) {
//          console.log('Response: ' + chunk);
//      });
//  });
//
//  
//
//}
//
//
//
//
//
//
//PostCode();



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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
