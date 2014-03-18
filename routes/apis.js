
var apis = module.exports;


apis.index = function(req, res, next){
	res.render('apis', { title: 'restful apis', navitem: 'apis'});
}