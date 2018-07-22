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

    if( navigator.userAgent.match( /IEMobile\/10\.0/ ) ) {

        var msViewportStyle = document.createElement( 'style' );

        msViewportStyle.appendChild(
            document.createTextNode( '@-ms-viewport{width:auto!important}' )
        )

        document.head.appendChild( msViewportStyle )
    }
}());

$( document ).ready( function() {

    updateGDPRConsentStatus();

    // Episodes' Providers

    var hash = window.location.hash;
        hash && $( 'ul.nav-pills a[href="' + hash + '"]' ).tab( 'show' );

    var $serverSelection = $( '#server-selection' );
    var $loading         = $( '.loading-icon' );

    if( hash ) {

        $serverSelection.hide();

        $loading.removeClass( 'hidden' );

        var $provider = $( hash ).find( '.player' );

        $( '<iframe/>', {
            'src': $provider.parent().attr( 'data-url' )
        }).attr({
            'allow': 'encrypted-media',
            'allowfullscreen': '',
            'mozallowfullscreen': '',
            'webkitAllowFullScreen': '',
            'scrolling': 'no'
        }).appendTo( $provider );

        $provider.find( 'iframe' ).on( 'load iframeready', onAfterLoad( hash ) );
    }

    /**
     * Creates the Video IFrame on-demand when one of the available
     * Providers is chosen by clicking in one of the Navigation Tabs/Pills
     */
    $( '.nav-pills a' ).on( 'click', function( e ) {

        $( '.loading-icon' ).removeClass( 'hidden' );

        var $provider = $( this.hash ).find( '.player' );

        if( $provider.find( 'iframe' ).length == 0 ) {

            $( '<iframe/>', {
                'src': $provider.parent().attr( 'data-url' )
            }).attr({
                'allowfullscreen': '',
                'mozallowfullscreen': '',
                'webkitAllowFullScreen': '',
                'scrolling': 'no'
            }).appendTo( $provider );
        }

        $provider.find( 'iframe' ).on( 'load iframeready', onAfterLoad( this ) );
    });

    /**
     * Open up a popup in which the Social Media contents will go.
     */
    $( '#social a[data-href]' ).on( 'click', function( e ) {

        var $this = $( this );

        e.preventDefault();

        popup(
            $this.attr('data-href'),   $this.data('title') || '',
            $this.data('width') || 500, $this.data('height') || 300
        );
    });

    /**
     * GDPR Consent Buttons Handlers
     */
    $( 'footer.gdpr .accepted' ).on( 'click', function() {

        Cookies.set( 'GDPRv2', '1' );

        updateGDPRConsentStatus();
    });

    $( 'footer.gdpr .declined' ).on( 'click', function() {

        Cookies.set( 'GDPRv2', '0' );

        updateGDPRConsentStatus();
    });

    // Auxiliary Functions

    /**
     * Wrapper function with routines to be executed after the IFrame built
     * has been fully loaded
     *
     * @param  string chosen
     *  A string ID for which of the available Providers has been chosen
     */
    function onAfterLoad( chosen ) {

        // Display Bootstrap Navigation Panel associated to the chosen Provider

        $( chosen ).tab( 'show' );

        // Hiding the informative bar asking to chose a Provider

        $serverSelection.hide();

        /**
         * @internal
         *
         * Modifying the URL Hash.
         * We'll try to read the URL from a clicked anchor.
         * If undefined — i.e. loading an URL with an already existing anchor —
         * we'll use the argument instead to not modify what's already there
         */
        window.location.hash = chosen.hash || chosen;

        $( 'html, body' ).scrollTop( 0 );
    }

    /**
     * Show/Hide the GDPR Consent message accordingly to our control Cookie.
     * If set as boolean-integer 1, the User has agreed. Otherwise, if set as
     * zero, the User has declined
     */
    function updateGDPRConsentStatus() {

        window.GDPR = ( Cookies.get( 'GDPRv2' ) || 0 );

        if( window.GDPR ) {
            $( 'footer.gdpr' ).addClass( 'hidden' );
        } else {
            $( 'footer.gdpr' ).removeClass( 'hidden' );
        }
    }
});

/**
 * Ye olde popups ^_^
 *
 * @param  string url
 *  URL Address to open
 *
 * @param  string title
 *  Window Title/Name
 *
 * @param  integer w
 *  Window Width
 *
 * @param  integer h
 *  Window Height
 *
 * @return Window
 *  A Window object representing to the newly created window
 */
function popup( url, title, w, h ) {

    wLeft = window.screenLeft ? window.screenLeft : window.screenX;
    wTop  =  window.screenTop ?  window.screenTop : window.screenY;

    var left = wLeft + (  window.innerWidth / 2 ) - ( w / 2 );
    var top  =  wTop + ( window.innerHeight / 2 ) - ( h / 2 );

    return window.open( url, title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, ' +
      'scrollbars=no, resizable=no, copyhistory=no, ' +
      'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left
    );
}