var HOST = "http://localhost:3000";

var socket = io.connect('/queue');

(function($){
  $.getUrlParam = function(name)
  {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null; 
  }
})(jQuery);

socket.on('connect', function () {

  socket.on('completed', function(data) {
    processMark(data)
    console.log('process completed');
  });

  socket.on('failed', function() {
    $("divResult").html("fail");
    console.log('process failed');
  });

  socket.on('update', function(data) {
    console.log(data);
  });
  var url = $.getUrlParam('url');
  socket.emit('enqueue', {url: url});
  // var url = jQuery.url.param('url');
  $("#siteUrl").html(url);
  // alert(url);
  
});

function processMark(data){
  // $("#siteUrl").html(data.url);
  switch (data.jobtype){
    case "marksite":
      formatMark(data);
      break;
    case "allinone":
      formatImg(data);
    //   break;
    // case "loadspeed":
      formatSpeed(data);
    //   break;
    // case "createhar":
      formatHar(data);
      break;
    default:
      $("#siteUrl").html(data.url);
  }
}

function formatSpeed(data){
  var dataUrl = '/speeds/' + data.uuid;
  $.get(dataUrl, function(data){
    $("#markSpeed").html("<strong>" + data + "</strong>秒");
  })
}

function formatHar(data){
  $("#harViewer").attr('src', '/index.html?inputUrl=/hars/' + data.uuid + '.harp');
}

function formatImg(data){
  $("#loadingImg1").hide();
  $('<img src="/images/' + data.uuid + '.png"/>').appendTo("#siteshot");
}

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

function formatMark(data){
  var dataUrl = '/jsons/' + data.uuid + '.json';
  $.getJSON(dataUrl, function(data){
    var items = [];
    $.each(data.g, function(k, v){
      items.push("<tr><td>" + CHECKITEM[k] + "</td>");
      items.push("<td>" + v.score + "</td>");
      items.push("<td>" + v.message + "</td>");
      items.push("<td><a>点击查看</a></td></tr>");
    });
    $("#loadingImg").hide();
    $(items.join( "" )).appendTo("#markoverview");
    $("#scoreDiv").html("<strong>" + data.o + "</strong>");
  })
}