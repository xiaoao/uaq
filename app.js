
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
// var partials = require('express-partials');
var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
var kue = require('kue');
var routes = require('./routes');
var user = require('./routes/user');
// var http = require('http');
var path = require('path');

// redis
var redis = require("redis");
var client = redis.createClient();
exports.redis = redis

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
// app.use(partials());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
app.use(kue.app)
server.listen(app.get('port'))
console.log('Express server listening on port ' + app.get('port'));

exports.server = server

// uaq
var jobs = kue.createQueue();

var uaq = require('./routes/uaq')
uaq.init(jobs);

var httpworker = require('./helper/httpworker');
httpworker.init(jobs);

jobs.process('uaq check', function(job, done){
  uaq.mark(job.data.url, done);
});

// about
var about = require('./routes/about')

// jstest
var jstest = require('./routes/jstest')

// css
var css = require('./routes/css')

// apis
var apis = require('./routes/apis')

// docs
var docs = require('./routes/docs')

// tools
var tools = require('./routes/tools')

// tools
var uaqq = require('./tools/uaq')

var capture = require('./services/capture')
// routes
app.get('/', routes.index);
app.post('/easy', uaq.check);
app.get('/easy', uaq.getCheck);
app.get('/users', user.list);
app.get('/jstest', jstest.index);
app.get('/cssanalyst', css.index);
app.get('/apis', apis.index);
app.get('/documents', docs.index);
app.get('/tools', tools.index);
app.get('/speed', uaqq.index);
app.get('/about', about.index);
app.get('/tools/snapshot', tools.snapshot);
app.post('/services/capture', capture.index)

// app.get('/queue', uaq.queue);

process.on('uncaughtException', function(err){
  console.log('Exception: ' + err.stack);
});