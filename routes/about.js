
var about = module.exports;


about.index = function(req, res, next){
	res.render('about', { title: 'about UAQ easy!', navitem: 'about'});
}