
var parent = module.parent.exports ;
var redis = parent.redis;

// var phantom = require('phantomjs')

// var page = require('webpage').create(),
//     system = require('system'),
//     t, address;

var uaqq = module.exports;

uaqq.index = function(req, res, next){
	url = "http://www.baidu.com"
	s = uaqq.speed(url)
	res.render('speed', { title: 'Check' + url, navitem: 'index', speed: s});
}

uaqq.speed = function(url){
	if(!url)
		return 0
	var page = require('webpage').create()
	var t = Date.now();
	var s
    address = system.args[1];
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            s = Date.now() - t;
            // console.log('Page title is ' + page.evaluate(function () {
            //     return document.title;
            // }));
        }
        phantom.exit();
    });
    return s / 1000;
}

// if (system.args.length === 1) {
//     console.log('Usage: loadspeed.js <some URL>');
//     phantom.exit(1);
// } else {
//     t = Date.now();
//     address = system.args[1];
//     page.open(address, function (status) {
//         if (status !== 'success') {
//             console.log('FAIL to load the address');
//         } else {
//             t = Date.now() - t;
//             // console.log('Page title is ' + page.evaluate(function () {
//             //     return document.title;
//             // }));
//             console.log(t / 1000);
//         }
//         phantom.exit();
//     });
// }