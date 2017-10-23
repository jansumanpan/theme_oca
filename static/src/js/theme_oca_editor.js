(function() {
    "use strict";
    var website = openerp.website;
    var _t = openerp._t;
    

    website.snippet.options.carousel_oca_options = website.snippet.Option.extend({

        on_focus: function() {
            alert("On focus!");
        }

    });


})();