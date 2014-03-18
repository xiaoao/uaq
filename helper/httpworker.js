
/*
 * httpworker
 */
var parent = module.parent.exports ;
var server = parent.server;
var redis = parent.redis;

var exec = require('child_process').exec;
var assert = require('assert');
var uuid = require('node-uuid');
var fs = require('fs')
var validator = require('validator');
var util = require('util');

var jobs_service = require('../jobs').services;

var httpworker = module.exports;

var _jobs;

httpworker.init = function(jobs){
	if(!!_jobs){
		return _jobs;
	}else{
		_jobs = jobs
		return _jobs
	}
}

httpworker.prepareJob = function(url, res, uuid, opt){
	for(var i = 0; i < jobs_service.length; i++ ){
		for(var key in jobs_service[i]){
			if(key == 'job'){
				httpworker.createMarkJob(jobs_service[i][key], res, url, uuid, opt)
			}
		}
		httpworker.work(jobs_service[i].job, jobs_service[i].command, jobs_service[i].workers)
	}
}

httpworker.createMarkJob = function(jobtype, res, url, uuid, opt){
	var job = _jobs.create(jobtype, {
    url: url,
    uuid: uuid,
    jobtype: jobtype,
    selector: opt.selector,
    script: opt.script
  }).save();

  job.on('complete', function() {
  	// res.redirect('/service/' + job.data.jobtype + '?uuid=' + job.data.uuid + '&callback=' + job.data.url);
  	res.json({uuid: job.data.uuid, url: job.data.url, jobtype: job.data.jobtype})
  });

  job.on('failed', function(code) {
  	console.log('failed---------------------------', code)
  });
}

httpworker.work = function(jobtype, command, workers){
	_jobs.process(jobtype, workers, function(job, done) {
		assert.ok(!fs.existsSync());
		cmd = util.format(command, job.data.url, job.data.uuid, job.data.selector, job.data.script)
		console.log(job.data.url, job.data.uuid, job.data.selector, job.data.script, '\n\n\n\n\n\n\n99999:', cmd , '\n\n\n\n')
		// cmd = "phantomjs ./tools/capture.js http://www.baidu.com/ iiiiiiii " + " '#m' " + " \"document.querySelector('#nv').style.visibility = 'hidden';\""
		console.log("\n\ncmd",cmd);
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