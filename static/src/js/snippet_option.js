(function() {
    "use strict";
    var website = openerp.website;
    var _t = openerp._t;

    website.add_template_file('/theme_oca/static/src/xml/slider_config.xml');

    website.snippet.options.oca_snippet_option = website.snippet.Option.extend(
    {   
       
        start: function(editMode)
        {  
            var self = this;
            this._super();
            this.$target.find('.oca_snip').empty();
            if (!editMode) {
                self.$el.find(".oca_snip").on("click", _.bind(self.slider_config_options, self));
            }
        },
         drop_and_build_snippet: function() {
            var self = this;
            this._super();
            if (this.slider_config_options()) {
                this.slider_config_options().fail(function() {
                    self.editor.on_remove();
                });
            }
        },
        clean_for_save: function() 
        {
            // $('.oca_snip').empty();
                // .append(
                // 	jQuery('<t />')
                //         .attr('t-call', 'theme_oca.display_categories')
                //         .attr('t-ignore-branding', '1')
                //         // this.$target.find('content_best_sellers')
                //         // .append(
                //         // 	jQuery('<t />')
                //         // 	 .attr('t-call', 'website_best_sellers.display_products')
                //         // 	 .attr('t-ignore-branding', '1')
                //         // 	);

                //         // .append(
                //         //     jQuery('<t />')
                //         //        .attr('t-value', this.$target.attr('data-blog_id'))
                //         //        .attr('t-set', 'blog_id')
                //         //        .attr('t-ignore-branding', '1'),
                //         //     jQuery('<t />')
                //         //         .attr('t-value', this.$target.attr('data-parameter_id'))
                //         //         .attr('t-set', 'parameter_id')
                //         //         .attr('t-ignore-branding', '1')
                //         //      )
                       
                // );
        
        },
         slider_config_options: function(type, value) {
            var self = this;
            if (type == "click" || type == undefined) {
                self.$modal = $(openerp.qweb.render("theme_oca.oca_slider"));
                console.log("slider_config_options")
                self.$modal.appendTo('body');
                self.$modal.modal();
                var $slider_type = self.$modal.find("#slider_type"),
                    $cancel = self.$modal.find("#cancel"),
                    $snippnet_submit = self.$modal.find("#snippnet_submit");

                openerp.jsonRpc('/theme_oca/oca_slider_settings', 'call', {}).done(function(result) {
                    $("select[id='slider_type'] option").remove();
                    console.log("res:" + result)
                    var res = JSON.parse(result);
                    _.each(res, function(y) {
                         $("select[id='slider_type']").append($('<option>', {
                            value: y["id"],
                            text: y["name"]
                        }));
                    });
                });

                $snippnet_submit.on('click', function() {
                    console.log("clicked sumbit")
                    var type = '';
                    self.$target.attr('data-multi-cat-slider-type', $slider_type.val());
                    self.$target.attr('data-multi-cat-slider-id', 'multi-cat-myowl'+ $slider_type.val());
                    if ($('select#slider_type').find(":selected").text()) {
                        type = _t($('select#slider_type').find(":selected").text());
                    } else {
                        type = _t("Slider");
                    }
                    self.$target.empty().append('<div class="container">\
                                                    <div class="row our-categories">\
                                                        <div class="col-md-12">\
                                                            <div class="title-block">\
                                                                <h4 class="section-title style1">\
                                                                    <span>' + type + '</span>\
                                                                </h4>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                </div>');
                });
            }else {
                return;
            }
        },

    });
})();