
var css = module.exports;


css.index = function(req, res, next){
	res.render('css', { title: 'CSS Analysis - CSS Performance analyst', navitem: 'css'});
}