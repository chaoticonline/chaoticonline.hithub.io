/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2017 The Bootstrap Authors
 * Copyright 2014-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var a=document.createElement("style");a.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));document.head.appendChild(a)}}());(function(c,b,a){c(function(){var e=b.location.hash;e&&c('ul.nav-pills a[href="'+e+'"]').tab("show");var d=c("#server-selection");if(e){d.tab("hide").css("display","none")}c(".nav-pills a").on("click",function(f){c(this).tab("show");d.hide();b.location.hash=this.hash;c("html, body").scrollTop(0)})})}(window.jQuery,window,document));