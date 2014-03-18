
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'UAQ easy by xiaoao!', navitem: 'index' });
};