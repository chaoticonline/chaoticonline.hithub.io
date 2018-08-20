/**
 * Card Search Mugic Cards Data Parser | themes\chaotic\src\js\cards\parsers\Mugic.js
 *
 * @author       Bruno Augusto
 * @copyright    Copyright (c) 2017-2018 Next Studios
 *
 * @uses        themes\chaotic\src\js\common\Core.js
 */
class Mugic extends Core {

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
    }

    /**
     * Clones the Template markup into the final node, preparing the structure
     * for all parsed results
     */
    build() {
        $( '#templates .mugics' ).clone().insertAfter( this.results.find( 'h4' ) );
    }

    /**
     * Parses received data filling the appropriate Template Fields
     */
    parse() {

        let name   = this.data.find( 'h3' ).first().text().trim();

        /**
         * @internal
         *
         * Even though this function will parse only Creatures' Data
         * we need to look up for the information in order to show the i10n data
         */
        let rarity = this.data.find( '.rarity' ).text().trim();

        /**
         * @internal
         *
         * For some odd reason trying to find the element `.breadcrumb` directly,
         * like the other text extractions, doesn't work
         */
        let tribe     = this.data.find( '#tribe' ).text().trim();

        $( '<tr/>' ).append(
            $( '<td/>', { 'class': 'name' }).html(
                $( '<a/>', { 'href': this.url }).text( name )
            )
        )
        .append( $( '<td/>', { 'class': 'rarity' } ).text( rarity ) )
        .append( $( '<td/>', { 'class': 'tribe' } ).text( tribe ) )
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