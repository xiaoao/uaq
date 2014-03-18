
var jstest = module.exports

jstest.index = function(req, res, next){
	res.render('jstest', { title: 'javascript test', navitem: 'jstest'});
}