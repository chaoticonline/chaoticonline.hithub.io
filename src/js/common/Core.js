/**
 * Core Resources | themes\chaotic\src\js\common\Core.js
 *
 * @author       Bruno Augusto
 * @copyright    Copyright (c) 2017-2018 Next Studios
 */
class Core {

    /**
     * Core Object Constructor
     * Initializes Parameterizable Concept with URL Parameters and
     * triggers Additional Initialization Concept
     *
     * @param  Object options
     *  End-user options to be merged
     */
    constructor( options ) {

        this.options = new WeakMap;
        this.options.set(
            this, jQuery.extend( {}, this.setOptions(), options )
        );

        this.cache = {};

        // Additional Initialization

        this.init();
    }

    /**
     * Additional Initialization. Must be overwritten
     */
    init() {}

    // Parameter-related Methods Implementation

    getOptions() {
        return this.options.get( this );
    }

    /**
     * Set Class Options
     *
     * @param Object|optional options
     *  Parameters to be merged with current ones
     *
     * @param boolean|optional reinitialize
     *  Flag conditioning whether or not the Object will be reinitialized after
     *  merging — and only after merging, implying some Parameters Options have
     *  to be passed as well — the new Parameter Options.
     *  Useful when the overwritable Core.init() defines properties based on
     *  received Parameters belatedly set.
     *  Defaults to FALSE
     *
     * @return Object
     *  If arguments are passed this method is being invoked through an
     *  Object instance and, therefore, the instance itself will be returned
     *  to provide Fluent Interface
     *
     *  Without arguments, this method is being invoked by Core constructor,
     *  to merge children class' Default Parameters with Instance Parameters.
     *  Since Instance Parameters may be all optional, an empty Object is
     *  returned so jQuery.extend() can do its work
     */
    setOptions( options, reinitialize ) {

        if( options && ( ! ( Object.keys( options ).length === 0 && options.constructor === Object ) ) ) {

            this.options.set(
                this, jQuery.extend( {}, this.options.get( this ), options )
            );

            if( reinitialize ) this.init();

            return this;
        }

        return {};
    }

    /**
     * Performs an AJAX Request to load data if not loaded yet
     *
     * @param string url
     *  URL to be loaded
     *
     * @return Promise
     *  The jqXHR Object, which implements jQuery's Promise Interface.
     *  If a Resource hasn't been loaded — and thus not cached — it will
     *  before being returned
     *
     * @see https://gosukiwi.svbtle.com/the-right-way-of-caching-ajax-requests-with-jquery
     */
    load( url ) {

        if( ! this.cache[ url ] ) {
            this.cache[ url ] = $.ajax( url );
        }

        return this.cache[ url ];
    }

    // Accessory Methods

    /**
     * Checks if given Object is a jQuery Event
     *
     * @param  mixed event
     *  Argument to be tested as jQuery Event
     *
     * @return boolean
     *  Return TRUE if argument is a valid jQuery Event and FALSE otherwise
     */
    isEvent( event ) {
        return ( event.originalEvent instanceof Event );
    }

    /**
     * Checks if given Object is an instance of jQuery
     *
     * @param  mixed obj
     *  Argument to be tested as jQuery Object
     *
     * @return boolean
     *  TRUE if argument is an instance of jQuery and FALSE otherwise
     *
     * @internal
     *  Manual ternary operator required, otherwise 'undefined' is returned when test fails
     */
    isjQuery( obj ) {
        return ( obj && ( obj instanceof jQuery || obj.constructor.prototype.jquery ) ) ? true : false;
    }

    /**
     * Detects whether or not User session is under mobile environment or not
     * by analyzing browser's User-Agent
     *
     * @return boolean
     *  TRUE if User session is udner Mobile environment and FALSE otherwise
     *
     * @see http://detectmobilebrowsers.com/mobile
     * @see https://stackoverflow.com/a/11381730/753531
     */
    isMobile() {
        let check = false;

        (function(a){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;
        })(navigator.userAgent||navigator.vendor||window.opera);

        return check;
    }

    /**
     * Get (innermost) Class name
     *
     * @return string
     *  Class name
     *
     * @see http://stackoverflow.com/a/29278010/753531
     */
    getClassName() {
        return ( ( "" + this.constructor ).split( "function " )[ 1 ].split( "(" )[ 0 ] );
    }

    /**
     * Get URL Parameters
     *
     * @param  string|optional path
     *  An optional string to cleanup Location Pathname
     *
     * @return Object
     *  A Object with all key/value pairs found in (cleaned) Location Pathname
     */
    getURLParameters() {

        let target = window.location.pathname.replace( /^\/|\/$/g, '' );

        // Removing substrings from it, common ones and a custom defined

        target = target.replace( /[ ]{2,}/, '' );

        let result = {};

        // Extracting Parameters

        target.replace( /^\/+|\/+$/g, '' ).concat( '/' ).split( '/' ).forEach( ( x, i, a ) => {
          if( i % 2 ) result[ a[ i - 1 ] ] = x;
        });

        return result;
    }
}