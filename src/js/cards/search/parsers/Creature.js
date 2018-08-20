/**
 * Card Search Creature Cards Parser | themes\chaotic\src\js\cards\parsers\Creature.js
 *
 * @author       Bruno Augusto
 * @copyright    Copyright (c) 2017-2018 Next Studios
 *
 * @uses        themes\chaotic\src\js\common\Core.js
 */
class Creature extends Core {

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
        $( '#templates .creatures' ).clone().insertAfter( this.results.find( 'h4' ) );
    }

    /**
     * Parses received data filling the appropriate Template Fields
     */
    parse() {

        let name      = this.data.find( 'h3' ).first().text().trim();

        /**
         * @internal
         *
         * Even though this function will parse only Creatures' Data
         * we need to look up for the information in order to show the i10n data
         */

        /**
         * @internal
         *
         * Some Creatures have variations of themselves, so let's pick-up data
         * from the first one only
         */
        let rarity    = this.data.find( '.rarity' ).first().text().trim();

        /**
         * @internal
         *
         * For some odd reason trying to find the element `.breadcrumb` directly,
         * like the other text extractions, doesn't work
         */
        let tribe     = this.data.find( '.breadcrumb-item:not(.active)' ).last().text().trim();

        let energy    = this.data.find( '#energy' ).first().text().trim();
        let mugicians = this.data.find( '#mugicians' ).first().text().trim();

        let courage   = this.data.find( '#courage' ).first().text();
        let power     = this.data.find( '#power' ).first().text();
        let wisdom    = this.data.find( '#wisdom' ).first().text();
        let speed     = this.data.find( '#speed' ).first().text();

        let fire      = this.data.find( '.fire' ).first();
        let air       = this.data.find( '.air' ).first();
        let earth     = this.data.find( '.earth' ).first();
        let water     = this.data.find( '.water' ).first();

        // Elemental Affinities Icons

        let yes       = $( '#caching img.yes' );
        let no        = $( '#caching img.no' );

        $( '<tr/>' ).append(

            $( '<td/>', { 'class': 'name' }).html(
                $( '<a/>', { 'href': this.url }).text( name )
            )
        )
        .append( $( '<td/>', { 'class': 'rarity' } ).text( rarity ) )
        .append( $( '<td/>', { 'class': 'tribe' }).text( tribe ) )
        .append( $( '<td/>', { 'class': 'energy' } ).text( energy ) )
        .append( $( '<td/>', { 'class': 'mugicians' } ).text( mugicians ) )
        .append( $( '<td/>', { 'class': 'courage' } ).text( courage ) )
        .append( $( '<td/>', { 'class': 'power' } ).text( power ) )
        .append( $( '<td/>', { 'class': 'wisdom' } ).text( wisdom ) )
        .append( $( '<td/>', { 'class': 'speed' } ).text( speed ) )
        .append(
            $( '<td/>', { 'class': 'fire' } ).append( ( fire.hasClass( 'active' ) ? yes : no ).clone() )
        )
        .append(
            $( '<td/>', { 'class': 'air' } ).append( ( air.hasClass( 'active' ) ? yes : no ).clone() )
        )
        .append(
            $( '<td/>', { 'class': 'earth' } ).append( ( earth.hasClass( 'active' ) ? yes : no ).clone() )
        )
        .append(
            $( '<td/>', { 'class': 'water' } ).append( ( water.hasClass( 'active' ) ? yes : no ).clone() )
        )
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