
var docs = module.exports;


docs.index = function(req, res, next){
	res.render('docs', { title: 'Documents', navitem: 'documents'});
}