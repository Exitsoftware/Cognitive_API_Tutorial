var express = require('express');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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


//Cognitive API

//var requestBody = {'url': 
//'https://s-media-cache-ak0.pinimg.com/736x/09/6b/10/096b101cd34c08b79bb0e6aec2b3afb5.jpg'
//};
//
//request.post({
//    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
//    method: 'POST',
//    host: 'api.projectoxford.ai',
//    body: JSON.stringify(requestBody),
//    headers: {
//        'Content-Type': 'application/json',
//        'Ocp-Apim-Subscription-Key': '7ff4dabe4c274faab2f9de338a66a326',
//    }
//}, function(err, res, body){
//    console.log(res.body);
//})


//Obtain Access Token
//var accessToken;
//request.post({
//    url: 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13',
//    method: 'POST',
//    headers:{
//        'Content-Type': 'application/json; charset=utf-8',
//    },
//    form: {
//        "client_id": "nyj9288",
//        "client_secret": "36NQCJ15Jisp9N+gE9rHcHLNCR/0255KlxfmevsZnQM=",
//        "scope": "http://api.microsofttranslator.com",
//        "grant_type": "client_credentials"
//    }
//}, function(err, res, body){
////    console.log(JSON.parse(body).access_token);
//    accessToken = JSON.parse(body).access_token;
//})
//
//
//var url = 'http://api.microsofttranslator.com/V2/Ajax.svc/Translate';
//var from = 'ko';
//var to = 'en';
//var text = '안녕';
//var accessToken = 'xkMnHzw0O0XKNG4q93jysUCvCx4R7rM3sU%2fnFU5O364%3d'
// 
//
//
//url += '?appId=Bearer '+accessToken+'&from='+from+'&to='+to+'&text='+text+'&oncomplete=mycallback';
//request.get(url, function(err, res, body){
//    console.log(res);
//})



console.log(encodeURIComponent("http://api.microsofttranslator.com/v2/Http.svc/Translate?from=en&to=ko&text=사랑해"));

//Bing Translater API
(function() {
    //INSTEAD OF request.get({}) I use XMLHTTPRequest! Also I stoped to decoding/encoding token. That's the solution.
    var makeTranslateRequest = function(token) {
        var xmlhttp = new XMLHttpRequest();
        var text = encodeURIComponent('39000원 슈바인학센 둘이서먹었어요 생각보다 양이 커플먹기에 괜찮아요! 대학생커플이먹기엔 조금 비싸긴하지만 가격만큼 맛있네요 건물 유리라서 분위기도 되게좋아요 바로 1층 디저트가게에서 후식도 먹을수있어요');
        xmlhttp.open("GET", "http://api.microsofttranslator.com/v2/Http.svc/Translate?from=ko&to=en&text="+text, true);
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState==4 && xmlhttp.status==200){
                console.log(xmlhttp.responseText);
            }
        }
        xmlhttp.send();
    }

    /**
     * Get token and make translate request in a callback
     */
    var requestOpts = querystring.stringify({
        client_id: 'nyj9288',
        client_secret: '36NQCJ15Jisp9N+gE9rHcHLNCR/0255KlxfmevsZnQM=',
        scope: 'http://api.microsofttranslator.com',
        grant_type: 'client_credentials'
    });

    request.post({
        encoding: 'utf8',
        url: "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13",
        body: requestOpts
    }, function(err, res, body) {
        var token = JSON.parse(body).access_token;
        makeTranslateRequest(token);
    });
})();






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
