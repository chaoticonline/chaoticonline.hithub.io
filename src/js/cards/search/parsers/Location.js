/**
 * Card Search Location Cards Parser | themes\chaotic\src\js\cards\parsers\Location.js
 *
 * @author       Bruno Augusto
 * @copyright    Copyright (c) 2017-2018 Next Studios
 *
 * @uses        themes\chaotic\src\js\common\Core.js
 */
class Location extends Core {

    /**
     * Additional Initialization.
     * Configure properties received from class constructor and
     * caches jQuery Selectors
     */
    init() {

        let options   = this.getOptions();

        this.data     = options.data;
        this.url      = options.url;

        this.results  = $( '#results' );
        this.template = $( '#templates .locations' );
    }

    /**
     * Parses received data filling the appropriate Template Fields
     */
    build() {

        let name          = this.data.find( 'h3' ).first().text().trim();

        /**
         * @internal
         *
         * Some Locations have variations of themselves, so let's pick-up data
         * from the first one only
         */
        let region     = this.data.find( '.region' ).first().text().trim();
        let rarity     = this.data.find( '.rarity' ).first().text().trim();
        let initiative = this.data.find( '.initiative' ).first().text().trim();

        if( this.results.find( 'table' ).length == 0 ) {
            this.template.clone().insertAfter( this.results.find( 'h4' ) );
        }

        $( '<tr/>' ).append(
            $( '<td/>', { 'class': 'name' }).html(
                $( '<a/>', { 'href': this.url }).text( name )
            )
        )
        .append( $( '<td/>', { 'class': 'rarity' } ).text( rarity ) )
        .append( $( '<td/>', { 'class': 'region' } ).text( region ) )
        .append( $( '<td/>', { 'class': 'initiative' } ).text( initiative ) )
        .append(
            $( '<td/>', { 'class': 'link' }).html(
                $( '<a/>', { 'href': this.url }).attr( 'target', '_blank' ).text(
                    this.results.find( 'table' ).attr( 'data-more-text' )
                )
            )
        )
        .appendTo( this.results.find( 'tbody' ) );
    }
}