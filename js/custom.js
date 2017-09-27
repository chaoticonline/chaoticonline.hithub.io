/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2017 The Bootstrap Authors
 * Copyright 2014-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var a=document.createElement("style");a.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));document.head.appendChild(a)}}());(function(c,b,a){c(function(){var e=c(".ads"),i=c(b),h=e.offset(),d=130;i.scroll(function(){if(i.scrollTop()>h.top){e.css({marginTop:i.scrollTop()-h.top+d})}else{e.css({marginTop:"5rem"})}});if(c("#home").length){c("body").css("overflow-y","hidden")}var g=b.location.hash;g&&c('ul.nav-pills a[href="'+g+'"]').tab("show");var f=c("#server-selection");if(g){f.tab("hide").css("display","none")}c(".nav-pills a").on("click",function(j){c(this).tab("show");f.hide();b.location.hash=this.hash;c("html, body").scrollTop(0)})})}(window.jQuery,window,document));