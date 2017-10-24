(function() {
      "use strict";

    var website = openerp.website;
    var _t = openerp._t;

    website.contentMenu.EditMenuDialog.include({
         start: function () {
            var r = this._super.apply(this, arguments);
            this.$('.oe_menu_editor').nestedSortable({
                listType: 'ul',
                handle: 'div',
                items: 'li',
                maxLevels: 5,
                toleranceElement: '> div',
                forcePlaceholderSize: true,
                opacity: 0.6,
                placeholder: 'oe_menu_placeholder',
                tolerance: 'pointer',
                attribute: 'data-menu-id',
                expression: '()(.+)', // nestedSortable takes the second match of an expression (*sigh*)
            });
            return r;
        },
    });
})();