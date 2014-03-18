
/*
 * uaq
 */
var parent = module.parent.exports ;
var server = parent.server;
var redis = parent.redis;

var exec = require('child_process').exec;
var child = require('child_process');
var assert = require('assert');
var uuid = require('node-uuid');
var fs = require('fs')
var validator = require('validator');
var util = require('util');
var io = require('socket.io').listen(server);

var JOBITEMS = require('../jobs').jobs;

var uaq = module.exports;

var io;
var _jobs;

uaq.init = function(jobs){
	if(!!_jobs){
		return _jobs;
	}else{
		_jobs = jobs
		return _jobs
	}
}

// var JOBITEMS = [{
//  	job: "marksite",
//  	command: 'phantomjs ./tools/yslow.js -i grade -f json %s > public/jsons/%s.json',
//  	workers: 1
// },{
// 	job: 'allinone',
// 	command: 'phantomjs ./tools/allinone.js %s %s',
// 	workers: 1
// }]

var MARKSITE = "marksite";
var ALLINONE = 'allinone';
var SCREENCAPTURE = 'screencapture';
var LOADSPEED = "loadspeed";
var CREATEHAR = 'createhar';

var COMMAND_MARKSITE = 'phantomjs ./tools/yslow.js -i grade -f json %s > public/jsons/%s.json'
var COMMAND_ALLINONE = 'phantomjs ./tools/allinone.js %s %s'
// var COMMAND_SCREENCAPTURE = 'phantomjs ./tools/rasterize.js %s public/images/%s.png'
// var COMMAND_LOADSPEED = 'phantomjs ./tools/loadspeed.js %s > public/loadspeeds/%s'
// var COMMAND_CREATEHAR = 'phantomjs ./tools/netsniff.js %s > public/hars/%s.harp'

// io.configure(function () {
//   io.set('transports', ['xhr-polling', 'jsonp-polling']); // nginx support
// });

// http post request
uaq.check = function(req, res){
  url = req.param('url');
  
  res.render('result', { title: 'Check' + url, navitem: 'index' });
};

// http get request
uaq.getCheck = function(req, res){
	url = req.param('url');
	res.render('result', { title: 'UAQ easy! - check ' + url });
}




var queue = io.of('/queue');

queue.on('connection', function (socket) {
  socket.on('enqueue', function(req) {
    
    try {
      validator.check(req.url).isUrl()
      console.log("\nurl:", req.url)
    } catch(e) {
      return socket.emit('failed', {code: 1000, message: e.message});
    }

    var strUuid = util.format('%s', uuid.v4())
    console.log('\n\nuuid:', strUuid, '\n\n\n\n')

    uaq.prepareJob(req.url, socket, strUuid);
  });
});

uaq.prepareJob = function(url, socket, uuid){
	for(var i = 0; i < JOBITEMS.length; i++){
		for(var key in JOBITEMS[i]){
			if(key == 'job'){
				uaq.createMarkJob(JOBITEMS[i][key], url, socket, uuid)
			}
		}
		uaq.work(JOBITEMS[i].job, JOBITEMS[i].command, JOBITEMS[i].workers)
	}
}

uaq.createMarkJob = function(jobtype, url, socket, uuid){
	var job = _jobs.create(jobtype, {
    url: url,
    uuid: uuid,
    jobtype: jobtype
  }).save();

  job.on('complete', function() {
    socket.emit('completed', {uuid: job.data.uuid, url: job.data.url, jobtype: job.data.jobtype});
  });

  job.on('failed', function(code) {
    socket.emit('failed', {code: code, message: null});
  });
  socket.emit('enqueue', {data: job.data});
}

uaq.work = function(jobtype, command, workers){
	_jobs.process(jobtype, workers, function(job, done) {
		assert.ok(!fs.existsSync());
		cmd = util.format(command, job.data.url, job.data.uuid)
		exec(cmd, function(err, stdout, stderr){
	  	if(err) 
	  		done()
	  	if (stderr)
	  		done()
	  	console.log('\n\n\n\nok:', jobtype, cmd)
	  	done()
	  })
	});
}