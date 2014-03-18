var page = require('webpage').create(),
    system = require('system'),
    t, address;
// redis
// var redis = require("redis");
// var client = redis.createClient();    

if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
    phantom.exit(1);
} else {
    t = Date.now();
    address = system.args[1];
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            t = Date.now() - t;
            // console.log('Page title is ' + page.evaluate(function () {
            //     return document.title;
            // }));
            console.log(t / 1000);
            // client.set("gooogle1111", t, redis.print);
        }
        phantom.exit();
    });
}