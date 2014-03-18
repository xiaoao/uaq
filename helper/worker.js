
var parent = module.parent.exports ;

var exec = require('child_process').exec;
var assert = require('assert');
var uuid = require('node-uuid');
var fs = require('fs')
var validator = require('validator');
var util = require('util');

var JOBITEMS = require('../jobs').jobs;

var worker = module.exports;

var _jobs;

worker.init = function(jobs){
	if(!!_jobs){
		return _jobs;
	}else{
		_jobs = jobs
		return _jobs
	}
}

worker.execJob = function(url, uuid){
	for(var i = 0; i < JOBITEMS.length; i++){
		uaq.work(JOBITEMS[i].job, JOBITEMS[i].command, JOBITEMS[i].workers)
	}
}

worker.work = function(jobtype, command, workers){
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