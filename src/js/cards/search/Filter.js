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
     * Filters received node list creating a list of all entries matching
     * only the wanted criteria, if any
     *
     * @return Filter
     *  Filter Instance (Fluent Interface)
     */
    filter() {

        // Listing all Taxonomy Terms that matters

        let ignoredTerms = [
            'type',
            'attacks', 'battlegears', 'creatures', 'locations', 'mugics',
            'tribe',
            'overworld', 'underworld', 'mipedians', 'danians', 'marrillians', 'tribeless', 'generic',
            'rarity',

            /**
             * @internal
             *
             * Must consider all available locales.
             *
             * WATCH OUT! Because data comes from Taxonomies, information
             * are tightly connected.
             * ANYTHING unwanted, if not listed here WILL generate duplicate
             * nodes, despite the pseudo-filtering made in Filter::build()
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

        if( this.type != 'any' ) {

            let byType = [];

            $.each( this.nodes.find( 'li[data-term="' + this.type + '"] ul li' ), ( offset, current ) => {
                byType.push( $( current ).attr( 'data-term' ) );
            });

            this.terms = $( this.terms ).filter( byType );
        }

        // Filtering by Card Tribe

        if( this.tribe != 'any' ) {

            let byTribe = [];

            $.each( this.nodes.find( 'li[data-term="' + this.tribe + '"] ul li' ), ( offset, current ) => {
                byTribe.push( $( current ).attr( 'data-term' ) );
            });

            this.terms = $( this.terms ).filter( byTribe );
        }

        // Filtering by Rarity

        if( this.rarity != 'any' ) {

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

        return this;
    }

    /**
     * Intersects the nodes collection received to remove anything that
     * doesn't match the criteria built by Filter::filter() and sorts
     * everything alphabetically
     *
     * @internal
     *
     * From this point, the original nodes' collection changes from all nodes
     * provides to only their <li>
     *
     * @return Filter
     *  Filter Instance (Fluent Interface)
     */
    intersect() {

        this.nodes = this.nodes.find( 'li' ).filter( ( offset, current ) => {
            return ( $.inArray( $( current ).attr( 'data-term' ), this.terms ) != -1 );
        }).sort( ( a, b ) => {
            return $( a ).attr( 'data-term' ).localeCompare( $( b ).attr( 'data-term' ) );
        });

        return this;
    }

    /**
     * Creates non-duplicate nodes in the swap area
     */
    build() {

        let map = {};

        $( this.nodes ).each( ( offset, current ) => {

            let term = $( current ).attr( 'data-term' );

            if( ! map[ term ] ) {

                this.swap.append( $( current ) );

                map[ term ] = true;
            }
        });
    }
}