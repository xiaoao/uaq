var CHECKITEM = {
	ynumreq: "请求数",
	ycdn: "CDN加速",
	yemptysrc: "emptysrc",
	yexpires: "过期设置",
	ycompress: "启用压缩",
	ycsstop: "CSS放在顶部",
	yjsbottom: "JS置于底部",
	yexpressions: "expressions",
	yexternal: "external",
	ydns: "DNS",
	yminify: "minify",
	yredirects: "redirects",
	ydupes: "dupes",
	yetags: "ETag启用",
	yxhr: "XHR",
	yxhrmethod: "XHRmethod",
	ymindom: "mindom",
	yno404: "NO404",
	ymincookie: "mincookie",
	ycookiefree: "cookiefree",
	ynofilter: "nofilter",
	yimgnoscale: "网页无缩放",
	yfavicon: "favicon"
}

// alert(CHECKITEM);
function formatMark(uuid){
  var dataUrl = '/jsons/' + uuid + '.json';
  $.getJSON(dataUrl, function(data){
  	var items = [];
  	$.each(data.g, function(k, v){
  		items.push("<tr><td><h1>" + CHECKITEM[k] + "</h1></td>");
  		items.push("<td>" + v.score + "</td>");
  		items.push("<td>" + v.message + "</td>");
  		items.push("<td><a>点击查看</a></td></tr>");
  	});
  	$(items.join( "" )).appendTo("#markoverview");
  	// item.push("<td><h1>" + data.g.ynumreq.score + "</h1><p>" + data.g.ynumreq.message + "</p></td>");
  	// item.push("<td><h1>" + data.g.ynumreq.score + "</h1><p>" + data.g.ynumreq.message + "</p></td>");
    // $("#markoverview").html("<td><h1>" + data.g.ynumreq.score + "</h1><p>" + data.g.ynumreq.message + "</p></td><td><h1><h1></td><td><h1><h1></td><td><h1><h1></td>");
  })
}
formatMark('f03c7a8a-1e09-4b09-8d43-6bc6df1568d4');