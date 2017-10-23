(function() {
    'use strict';
    var website = openerp.website;
    var _t = openerp._t;

    website.snippet.options.carousel_slider_opt = website.snippet.Option.extend({
        
        start: function(){
        	this.$target.find('.carousel-slider').html("Select here to edit");
        }
        
    });




})();