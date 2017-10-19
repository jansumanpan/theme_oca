(function() {

    'use strict';

    var website = openerp.website;
    website.openerp_website = {};

    website.snippet.animationRegistry.oca_snippet_option = website.snippet.Animation.extend({

        selector: ".oca_snip",
        start: function(editable_mode) {
            var self = this;
            // console.log(editable_mode)
            if (editable_mode) {
                $('.oca_snip .owl-carousel').empty();
            }
            if (!editable_mode) {
                // console.log('Will Run at Start')
                var slider_type = self.$target.attr('data-multi-cat-slider-type');
                $.post("/theme_oca/oca_get_cat", {
                    'slider-type': self.$target.attr('data-multi-cat-slider-type') || '',
                }).then(function(data) {
                    if (data) {
                        // console.log(self.$target)
                        // console.log(data)
                        self.$target.empty();
                        self.$target.append(data);
                        // console.log("newer")
                        self.$('.active.my-test').slice(1).removeClass('active');
                        var $li = self.$('.my-test');
                        // var $first_li = self.$('.active.my-test');
                         // console.log(self.$first_li)
                         // var $data_id = $first_li.children('a').data('id')
                         var tab_content = self.$el.find('a');
                          // console.log(tab_content)
                        $li.on('click', function() 
                            {
                                var self = $(this);
                                var $data_id = self.find('a').data('id')
                                var display_prod = self.closest('.psb-inner').find('.multi_hide .owl-carousel')
                                // $('.owl-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                                // $('.owl-carousel').find('.owl-stage-outer').children().unwrap();
                                $.post("/theme_oca/oca_get_prod", {'data_id':parseInt($data_id)})
                                    .then(function (data) {

                                        // var res = JSON.parse(data);

                                        // console.log("Show Data: " + data)
                                        display_prod.empty();
                                        display_prod.append(data)
                                        // $('.owl-carousel').data('owlCarousel').destroy();
                                        $('.owl-carousel').trigger('destroy.owl.carousel');
                                          $('.owl-carousel').owlCarousel({
                                                margin: 10,
                                                responsiveClass: true,
                                                items: 4,
                                                loop: true,
                                                stopOnHover: true,
                                                navigation: true,
                                                responsive: {
                                                    0: {
                                                        items: 1,
                                                    },
                                                    420: {
                                                        items: 2,
                                                    },
                                                    768: {
                                                        items: 3,
                                                    }
                                                },
                                            });

                                    });
                            }
                        )
                        // self.$target.
                        // $(".oe_multi_category_slider").removeClass('hidden');

                        // openerp.jsonRpc('/kingfisher_pro/product_multi_image_effect_config', 'call', {
                        //     'slider_type': slider_type
                        // }).done(function(res) {
                            // $('.multi_hide .owl-carousel').owlCarousel({
                            //     margin: 10,
                            //     responsiveClass: true,
                            //     items: 4,
                            //     loop: true,
                            //     autoPlay: res.sliding_speed,
                            //     stopOnHover: true,
                            //     navigation: true,
                            //     responsive: {
                            //         0: {
                            //             items: 1,
                            //         },
                            //         420: {
                            //             items: 2,
                            //         },
                            //         768: {
                            //             items: 3,
                            //         },
                            //         1000: {
                            //             items: 4,
                            //         },
                            //         1500: {
                            //             items: 5,
                            //         }
                            //     },
                            // });
                        // });

                    }
                });
            }
        }
    });

})();