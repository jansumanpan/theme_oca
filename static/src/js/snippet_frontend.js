(function() {

    'use strict';

    var website = openerp.website;
    website.openerp_website = {};

    website.snippet.animationRegistry.oca_multi_snippet_option = website.snippet.Animation.extend({

        selector: ".oca_multi_snip",
        start: function(editable_mode){
            var self = this;
            if(editable_mode){
                $('.oca_multi_snip .tabs-inner').empty();
            }
            if(!editable_mode){
                var multi_slider_type = self.$target.attr('data-multi-tab-slider-type');
                $.post("/theme_oca/oca_multi_get_tabs", {
                    'multi-slider-type': self.$target.attr('data-multi-tab-slider-type') || '',
                }).then(function(data){
                    if(data){
                        // console.log(data);
                        self.$target.empty();
                        self.$target.append(data);
                        self.$('.my-tabs:first').addClass('active');
                        var li = self.$('.my-tabs');

                        // function load_contents(data_id,display_tab_content){
                        //     $.post("/theme_oca/oca_multi_get_prod",{'data_id':parseInt(data_id)})
                        //     .then(function(data){
                        //         display_prod.empty();
                        //         display_prod.append(data);
                        //     });
                        // }

                        // self.$('.active.my-tabs').each(function(index, el) {
                        //     var self = $(this);
                        //         var $data_id = self.find('a').data('id')
                        //         var display_prod = self.closest('.psb-inner').find('.multi_hide .owl-carousel')
                        //         load_products_carousel($data_id,display_prod);
                        // });

                        // li.on('click', function(){
                        //     var self = $(this);
                        //     var data_id = self.find('a').data('id')
                        //     var display_tab_content = self.closest('tabs-inner').find('.tab-content .tab-pane')
                        //     load_contents(data_id,display_tab_content);
                        // });
                    }
                });
            }
        }

    });


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
                        self.$target.empty();
                        self.$target.append(data);
                        self.$('.active.my-test').slice(1).removeClass('active');
                        var $li = self.$('.my-test');
                        function load_products_carousel($data_id,display_prod){
                             $.post("/theme_oca/oca_get_prod", {'data_id':parseInt($data_id)})
                                    .then(function (data) {
                                        display_prod.empty();
                                        display_prod.append(data)
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
                        self.$('.active.my-test').each(function(index, el) {
                            var self = $(this);
                                var $data_id = self.find('a').data('id')
                                var display_prod = self.closest('.psb-inner').find('.multi_hide .owl-carousel')
                                load_products_carousel($data_id,display_prod);
                        });
                        $li.on('click', function() 
                            {
                                var self = $(this);
                                var $data_id = self.find('a').data('id')
                                var display_prod = self.closest('.psb-inner').find('.multi_hide .owl-carousel')
                                load_products_carousel($data_id,display_prod);
                                
                            }
                        )



                    }
                });
            }
        }
    });

})();