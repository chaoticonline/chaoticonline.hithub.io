/** NOT TO BE INCLUDED - Uglify and past inline at footer.html */

/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2017 The Bootstrap Authors
 * Copyright 2014-2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

// See the Getting Started docs for more information:
// https://getbootstrap.com/getting-started/#support-ie10-width

(function () {
  'use strict'

  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    )
    document.head.appendChild(msViewportStyle)
  }

}());

( function( $, window, document ) {

    $( function() {

        // Player Page Nav-Pills

        var hash = window.location.hash;
            hash && $( 'ul.nav-pills a[href="' + hash + '"]' ).tab( 'show' );

        var $serverSelection = $( '#server-selection' );

        if( hash ) $serverSelection.css( 'display', 'none' );

        $( '.nav-pills a' ).on( 'click', function( e ) {

          $( this ).tab( 'show' );

          $serverSelection.hide();

          window.location.hash = this.hash;

          $( 'html, body' ).scrollTop( 0 );
        });
    });

}( window.jQuery, window, document ) );