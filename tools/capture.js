
var page = require('webpage').create(),
	system = require('system'),
	fs = require('fs'),
	address;

var scriptpath = "public/js/"

if (system.args.length === 1) {
	console.log('Usage: loadspeed.js <some URL>');
	phantom.exit(1);
} else {
	address = system.args[1];
	uuid = system.args[2];
	selector = system.args[3];
	script = system.args[4];

	imgpath = 'public/images/' + uuid + '.png';
	jspath = scriptpath + uuid + '.js';

	if(check_script(script))
		fs.write(jspath, script, 'w');
	
	page.open(address, function (status) {
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			// phantom.cookiesEnabled = true;
			// page.injectJs("capture.js")
			// console.log(JSON.stringify(phantom.cookies, null, 2));
			
			if(check_selector(selector)) {
				page.clipRect = page.evaluate(function(selector) {
					return document.querySelector(selector).getBoundingClientRect(); 
				}, selector);
			}
			
			if(check_script(script))
				page.injectJs(jspath)

			window.setTimeout(function () {
				page.render(imgpath);
				phantom.exit();
			}, 200);
		}
	});
}

function check_selector(selector){
	return (selector == "" || selector == null) ? false : true;
}

function check_script(script){
	if(script == "") 
		return false;
	return true;
}