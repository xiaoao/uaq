var capture = module.exports;

var worker = require('../helper/httpworker');
var uuid = require('node-uuid');
var util = require('util');

capture.index = function(req, res, next){
	url = req.param('url');
	selector = req.param('selector');
	script = req.param('script');

	selector = "'" + selector + "'";
	script = '"' + script + '"';

	opt = {selector: selector, script: script};

	// console.log(opt)

	struuid = util.format('%s', uuid.v4())
// url, res, uuid, opt, callback
	worker.prepareJob( url, res, struuid, opt);
	// setInterval(function(){
	// 	res.json({uuid: struuid, url: url, jobtype: 'capture'})
	// }, 60000);
}
// var handler = function(err){
// 	if(err) next(err);
// }