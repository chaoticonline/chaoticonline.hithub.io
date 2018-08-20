/**
 * Card Search Filter | themes\chaotic\src\js\cards\Filter.js
 *
 * @author       Bruno Augusto
 * @copyright    Copyright (c) 2017-2018 Next Studios
 *
 * @uses        themes\chaotic\src\js\common\Core.js
 */
class Filter extends Core {

    /**
     * Additional Initialization.
     * Caches jQuery Selectors
     */
    init() {

        this.nodes = this.getOptions().data;

        this.type   = $( '#types' ).val();
        this.tribe  = $( '#tribes' ).val();
        this.rarity = $( '#rarities' ).val();

        this.name   = $( '#name' ).val().trim();

        this.swap   = $( '#swap' ).empty();

        this.terms  = [];
    }

    /**
     * Intersects the nodes filtered collection to remove anything that
     * doesn't match the criteria built by Filter::filter(), remove all
     * duplicated elements and sorts everything alphabetically
     *
     * @return Object
     *  jQuery Object with filtered Nodes List
     */
    getFilteredData() {

        this.filter();

        /**
         * @internal
         *
         * @var Object map
         *  Hashmap Object to hold already processed Terms in the
         *  second filtering function
         */
        let map = {};

        return this.nodes.find( 'li' ).filter( ( offset, current ) => {

            /**
             * @internal
             *
             * Filters out Nodes whose Data Attribute 'term' don't match the
             * list of valid Terms, built from User choices
             */
            return ( $.inArray( $( current ).attr( 'data-term' ), this.terms ) != -1 );

        }).filter( ( offset, current ) => {

            /**
             * @internal
             *
             * Because the Card Search works over Taxonomies, the same entry
             * may appear more than once, but as Term of a different category
             *
             * Because we need only one, the duplicates must be filtered out
             */
            let term = $( current ).attr( 'data-term' );

            if( ! map[ term ] ) {

                map[ term ] = true;

                return true;
            }

        }).sort( ( a, b ) => {

            /**
             * @internal
             *
             * Then we sort the results alphabetically
             */
            return $( a ).attr( 'data-term' ).localeCompare( $( b ).attr( 'data-term' ), {ignorePunctuation: true} );
        });
    }

    /**
     * Filters received node list creating a list of all entries matching
     * only the wanted criteria, if any
     *
     * @return Filter
     *  Filter Instance (Fluent Interface)
     */
    filter() {

        // Listing all Taxonomy Terms that matters

        let ignoredTerms = [
            'card type', 'tipo de carta',
            'attacks', 'battlegears', 'creatures', 'locations', 'mugics',
            'tribes', 'tribos',
            'overworld', 'underworld', 'mipedians', 'danians', 'm\'arrillians', 'tribeless', 'generic',
            'rarity',

            /**
             * @internal
             *
             * Must consider all available locales.
             *
             * WATCH OUT! Because data comes from Taxonomies, information
             * are tightly connected.
             * ANYTHING unwanted, if not listed here WILL generate duplicate
             * nodes, despite the pseudo-filtering made in Filter::filter()
             */
            'common', 'uncommon', 'rare', 'super rare', 'ultra rare', 'unknown',
            'comum', 'incomum', 'raro', 'super raro', 'ultra raro', 'desconhecido'
        ];

        $.each( this.nodes.find( 'ul li' ), ( offset, current ) => {

            let term = $( current ).attr( 'data-term' );

            if( $.inArray( term.toLowerCase(), ignoredTerms ) == -1 ) {
                this.terms.push( term );
            }
        });

        // Filtering by Card Type

        if( this.type != 'All' ) {

            let byType = [];

            $.each( this.nodes.find( 'li[data-term="' + this.type + '"] ul li' ), ( offset, current ) => {
                byType.push( $( current ).attr( 'data-term' ) );
            });

            this.terms = $( this.terms ).filter( byType );
        }

        // Filtering by Card Tribe

        if( this.tribe != 'All' ) {

            let byTribe = [];

            $.each( this.nodes.find( 'li[data-term="' + this.tribe + '"] ul li' ), ( offset, current ) => {
                byTribe.push( $( current ).attr( 'data-term' ) );
            });

            this.terms = $( this.terms ).filter( byTribe );
        }

        // Filtering by Rarity

        if( this.rarity != 'All' ) {

            let byRarity = [];

            $.each( this.nodes.find( 'li[data-term="' + this.rarity + '"] ul li' ), ( offset, current ) => {
                byRarity.push( $( current ).attr( 'data-term' ) );
            });

            this.terms = $( this.terms ).filter( byRarity );
        }

        /**
         * Filtering by Card Name
         *
         * @see https://stackoverflow.com/a/3261380/753531
         */
        if( ! ( this.name.length === 0 || ! this.name.trim() ) ) {

            this.terms = $( this.terms ).filter( ( offset, current ) => {
                return ( current.toLowerCase().indexOf( this.name ) !== -1 );
            });
        }

        this.terms = jQuery.uniqueSort( this.terms );

        return this;
    }
}