
var tools = module.exports

tools.index = function(req, res, next){
	res.render('tools', { title: 'UAQ tools', navitem: 'tools'});
}

tools.snapshot = function(req, res, next){
	res.render('snapshot', { title: 'UAQ tools snapshot', navitem: 'snapshot'});	
}