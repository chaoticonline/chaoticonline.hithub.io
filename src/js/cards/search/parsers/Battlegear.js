/**
 * Card Search Battlegear Cards Data Parser | themes\chaotic\src\js\cards\parsers\Battlegear.js
 *
 * @author       Bruno Augusto
 * @copyright    Copyright (c) 2017-2018 Next Studios
 *
 * @uses        themes\chaotic\src\js\common\Core.js
 */
class Battlegear extends Core {

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
        this.template = $( '#templates .battlegears' );
    }

    /**
     * Parses received data filling the appropriate Template Fields
     */
    build() {

        let name   = this.data.find( 'h3' ).first().text().trim();

        /**
         * @internal
         *
         * Even though this function will parse only Creatures' Data
         * we need to look up for the information in order to show the i10n data
         */

        let rarity = this.data.find( '.rarity' ).first().text().trim();

        if( this.results.find( 'table' ).length == 0 ) {
            this.template.clone().insertAfter( this.results.find( 'h4' ) );
        }

        $( '<tr/>' ).append(
            $( '<td/>', { 'class': 'name' }).html(
                $( '<a/>', { 'href': this.url }).text( name )
            )
        )
        .append( $( '<td/>', { 'class': 'rarity' } ).text( rarity ) )
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