/**
 * Card Search | themes\chaotic\src\js\cards\Search.js
 *
 * @author       Bruno Augusto
 * @copyright    Copyright (c) 2017-2018 Next Studios
 *
 * @uses        themes\chaotic\src\js\common\Core.js
 */
class Search extends Core {

    /**
     * Additional Initialization.
     * Caches Tribes dropdown selector and bind Event Handlers
     */
    init() {
        this.bindEventHandlers();
    }

    /**
     * Binds Event Handlers to form elements
     */
    bindEventHandlers() {

        /**
         * @internal
         *
         * Adjusts the Card Tribe text to not have "Generic Creatures" or
         * "Tribeless Mugics" and applies blocks on that dropdown when any other
         * Card Type is selected
         *
         * @see Handlers::onChange()
         */
        $( 'select' ).on( 'change', ( event ) => {

            let $this = $( event.currentTarget );

            /**
             * @internal
             *
             * Just so we can reuse the Event Handler... u.u'
             */
            if( $this.attr( 'id' ) == 'types' ) {
                this.onChange( $this );
            }
        });

        /**
         * @internal
         *
         * Fires the searching routine when the button is clicked
         *
         * @see Handlers::onClick()
         */
        $( 'button' ).not( '.gdpr button' ).on( 'click', () => {
            this.onClick();
        })

        /**
         * @internal
         *
         * Fires the searching routine when the form is submitted by any other
         * means that's not the button clicking — i.e. pressing <enter> while
         * on the text field
         *
         * @see Handlers::onSubmit()
         */
        $( 'form' ).on( 'submit', () => {

            this.onSubmit();

            return false;
        })
    }

    /**
     * Caches jQuery Selectors used throughout the class
     */
    cacheSelectors() {

        this.type     = $( '#types' ).val();
        this.tribe    = $( '#tribes' );
        this.rarity   = $( '#rarities' ).val();

        this.results  = $( '#results' );
        this.messages = $( '#messages' );
        this.loading  = $( '#loading-icon' );
    }

    /**
     * Changes the visibility of the Tribes dropdown entry related to
     * Tribeless Creatures / Generic Mugics accordingly to the value selected
     * on the Card Type dropdown
     *
     * It's merely a visual aide because there are no "Generic Creatures" or
     * "Tribeless Mugics"
     *
     * Also hides both options if any other option is selected
     *
     * @param jQuery option
     *  jQuery Object of the chosen element
     */
    onChange( option ) {

        this.cacheSelectors();

        // Caching Selectors

        let creatures = this.tribe.find( '.creatures' );
        let mugics    = this.tribe.find( '.mugics' );

        // Removes the restrictions on Tribes dropdown

        this.tribe.prop( 'disabled', false );

        /**
         * @internal
         *
         * If we already selected a Card Type or a Card Rarity let's reset
         * the Card Tribe to prevent possible mistakes. For example:
         *
         * "A User is searching for UnderWorld Creatures and then changes to
         * Attacks Cards. Without this, the Tribe dropdown would still
         * hold 'UnderWorld' resulting in no Cards because Attacks aren't
         * Tribe-specific"
         */
        if( this.type != 'any' || this.rarity != 'any' ) {
            this.tribe.val( 'any' );
        }

        switch( option.val() ) {

            /**
             * @internal
             *
             * When selecting the default option, keeps "Generic" hidden and
             * shows "Tribeless", after all, there's more Creatures than Mugics
             */
            case 'any':
                creatures.removeClass( 'hidden' );
                mugics.addClass( 'hidden' );
            break;

            /**
             * @internal
             *
             * When selecting "Mugics", hides "Tribeless", after all, there's
             * no "Tribeless Mugics", even though, conceptually, Generic Mugics
             * don't pertain to a Tribe
             */
            case 'Mugics':
                creatures.addClass( 'hidden' );
                mugics.removeClass( 'hidden' );
            break;

            /**
             * @internal
             *
             * When selecting "Creatures", hides "Generic", after all, there's
             * no "Generic Creatures"
             */
            case 'Creatures':
                mugics.addClass( 'hidden' );
                creatures.removeClass( 'hidden' );
            break;

            /**
             * @internal
             *
             * Event though it's not necessary, after all the whole Tribes
             * dropdown will be disabled, if any other option selected, hides
             * both "Tribeless" and "Generic", preventing accidental filtering
             */
            default:
                creatures.addClass( 'hidden' );
                mugics.addClass( 'hidden' );
                this.tribe.prop( 'disabled', true )
            break;
        }
    }

    /**
     * Searches for Cards based on provided filters, if any
     *
     * @see Handlers::search()
     */
    onClick() {
        this.search();
    }

    /**
     * @internal
     *
     * Prevents the form to be submitted the usual way, causing a page
     * redirection, by other means that's not through the button — i.e.
     * hitting <enter> while focusing the text field.
     *
     * But to not force the button to be clicked in order to trigger the
     * searching function, we'll manually trigger the searching function
     *
     * @see Handlers::search()
     */
    onSubmit() {
        this.search();
    }

    // Auxiliary Methods

    /**
     * Lists data from Taxonomy Page, optionally filtering its nodes accordingly
     * to the choices made, and builds the UI
     */
    search() {

        this.cacheSelectors();

        $.whenSync(

            /**
             * @internal
             *
             * Before anything else, we must reset the UI and the script flow
             * must wait until that
             *
             * @param  Deferred deferred
             *  Deferred Object
             *
             * @see http://api.jquery.com/category/deferred-object
             */
            ( deferred ) => {

                this.reset();

                deferred.resolve();
            },

            /**
             * @internal
             *
             * Even though the Loading Icon images are pre-loaded in the DOM,
             * it's nice to have the script to flow to make a micro-pause to
             * show it
             *
             * @param  Deferred deferred
             *  Deferred Object
             *
             * @see http://api.jquery.com/category/deferred-object
             */
            ( deferred ) => {

                this.loading.removeClass( 'hidden' );

                deferred.resolve();
            },

            /**
             * @internal
             *
             * The main routine
             *
             * Lists data from Taxonomy Page, optionally filtering its nodes
             * accordingly to the choices made, and builds the UI
             *
             * If anything goes wrong — i.e. no results found — the
             * Deferred Chain is interrupted
             *
             * @param  Deferred deferred
             *  Deferred Object
             *
             * @see http://api.jquery.com/category/deferred-object
             */
            ( deferred ) => {

                this.load( $( 'form' ).attr( 'data-source' ) ).done( ( response ) => {

                    var nodes = $( jQuery.parseHTML( response ) ).find( '#tags' );

                    /**
                     * @internal
                     *
                     * Nothing to parse.
                     * The deferred Chain is rejected and the script flow goes
                     * to $.whenSync().fail()
                     */
                    if( nodes.length == 0 ) {

                        this.messages.find( 'p.empty' ).removeClass( 'hidden' );

                        deferred.reject();
                    }

                    // Filtering...

                    let filter = new Filter({ 'data': nodes });
                        filter.filter().intersect().build();

                    // Gathering Informations

                    let entries  = $( '#swap li a' );

                    /**
                     * @internal
                     *
                     * Nothing found.
                     * The deferred Chain is rejected and the script flow goes
                     * to $.whenSync().fail()
                     */
                    if( entries.length == 0 ) {

                        this.messages.find( 'p.nothing' ).removeClass( 'hidden' );

                        deferred.reject();
                    }

                    /**
                     * @internal
                     *
                     * Choosing an HTML Parser base on Card Type dropdown.
                     * If no Card Type is selected, the default, more generic
                     * Parser will be used instead
                     */
                    let parser = new All;

                    switch( this.type ) {
                        case 'Attacks':     parser = new Attack;     break;
                        case 'Battlegears': parser = new Battlegear; break;
                        case 'Creatures':   parser = new Creature;   break;
                        case 'Locations':   parser = new Location;   break;
                        case 'Mugics':      parser = new Mugic;      break;
                    }

                    /**
                     * @internal
                     *
                     * This shouldn't be needed because there are
                     * NO duplicates in #swap >:(
                     */
                    let map = {};

                    $.each( entries, ( offset, current ) => {

                        let url = $( current ).attr( 'href' );

                        if( ! map[ url ] ) {

                            this.load( url ).done( ( response ) => {

                                parser.setOptions({
                                    'data': $( jQuery.parseHTML( response ) ),
                                    'url': url
                                }, true ).build();
                            });

                            map[ url ] = true;
                        }
                    });

                    deferred.resolve();

                /**
                 * @internal
                 *
                 * Unable to load data from Taxonomy Page.
                 * The deferred Chain is rejected and the script flow goes
                 * to $.whenSync().fail()
                 */
                }).fail( () => {

                    this.messages.find( 'p.error' ).removeClass( 'hidden' );

                    deferred.reject();
                });
            },

            /**
             * @internal
             *
             * Initializes FooTable Plugin
             *
             * @param  Deferred deferred
             *  Deferred Object
             *
             * @see http://api.jquery.com/category/deferred-object
             */
            ( deferred ) => {

                this.results.find( 'table' ).footable();

                /**
                 * @internal
                 *
                 * Preventing an accidental redirection when clicking on the
                 * Card Name cell with the link to its Article on mobile
                 */
                this.results.find( 'table' ).on( 'click', '.name a', ( event ) => {
                    if( this.isMobile() ) event.preventDefault();
                });

                /**
                 * @internal
                 *
                 * Resolving the Deferred Chain only after everything has been
                 * done, nodes addition and widgets initialization
                 */
                this.results.find( 'table' ).on( 'ready.ft.table', function( e, instance, rows ) {
                    deferred.resolve();
                })
            },

            /**
             * @internal
             *
             * FooTable decided to rename Bootstrap's Pagination classes which
             * turns it unstyled. Let's add them now
             *
             * @param  Deferred deferred
             *  Deferred Object
             *
             * @see http://api.jquery.com/category/deferred-object
             */
            ( deferred ) => {

                $( '#pagination .pagination li' ).each( function() {
                    $( this ).addClass( 'page-item' ).find( 'a' ).addClass( 'page-link' );
                });

                deferred.resolve();
            },

        /**
         * @internal
         *
         * The whole Deferred Chain was successfully resolved, let's hide
         * the Loading Icon (and any errors, just in case) and display the data
         */
        ).done( () => {

            this.results.addClass( 'hidden' );
            this.messages.addClass( 'hidden' );
            this.loading.addClass( 'hidden' );

            this.results.removeClass( 'hidden' );

            $( '#pagination' ).removeClass( 'hidden' );

        /**
         * @internal
         *
         * The whole Deferred Chain failed, let's reset the UI and display
         * the error element with the message defined before rejecting the Chain
         */
        }).fail( () => {

            this.reset();

            this.messages.removeClass( 'hidden' );
        });
    }

    /**
     * Resets DOM nodes to their initial states, in terms of CSS classes and rules
     */
    reset() {

        this.results.addClass( 'hidden' ).children().not( 'h4, #pagination' ).remove();
        this.messages.addClass( 'hidden' );
        this.loading.addClass( 'hidden' );

        // Removing dynamically built Pagination

        $( '#pagination' ).empty();
    }
}

/**
 * Triggers the Card Search feature
 */
new Search;