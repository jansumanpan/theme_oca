(function() {

    'use strict';

    var website = openerp.website;
    website.openerp_website = {};

    website.snippet.animationRegistry.oca_snippet_option = website.snippet.Animation.extend({

        selector: ".oca_snip",
        start: function(editable_mode) {
            var self = this;
            console.log(editable_mode)
            if (editable_mode) {
                $('.oca_snip').empty();
            }
            if (!editable_mode) {
                console.log('agi')
                var slider_type = self.$target.attr('data-multi-cat-slider-type');
                $.post("/theme_oca/oca_get", {
                    'slider-type': self.$target.attr('data-multi-cat-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        console.log(data)
                        self.$target.empty();
                        self.$target.append(data);
                        // $(".oe_multi_category_slider").removeClass('hidden');

                        // openerp.jsonRpc('/kingfisher_pro/product_multi_image_effect_config', 'call', {
                        //     'slider_type': slider_type
                        // }).done(function(res) {
                        //     $('.multi_hide .owl-carousel').owlCarousel({
                        //         margin: 10,
                        //         responsiveClass: true,
                        //         items: 4,
                        //         loop: true,
                        //         autoPlay: res.sliding_speed,
                        //         stopOnHover: true,
                        //         navigation: true,
                        //         responsive: {
                        //             0: {
                        //                 items: 1,
                        //             },
                        //             420: {
                        //                 items: 2,
                        //             },
                        //             768: {
                        //                 items: 3,
                        //             },
                        //             1000: {
                        //                 items: 4,
                        //             },
                        //             1500: {
                        //                 items: 5,
                        //             }
                        //         },
                        //     });
                        // });

                    }
                });
            }
        }
    });

})();