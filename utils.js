exports.parseJson = function(str){
  return String(str).trim().split(/\n+/).reduce(function(obj, line){
    var parts = line.split(/ *: */);
    obj[parts.shift()] = parseInt(parts.shift(), 10);
    return obj;
  }, {});
};
