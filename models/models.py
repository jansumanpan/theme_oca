from openerp import api, fields, models

class OcaSlider(models.Model):
    _name = 'oca.slider.config'

    name = fields.Char(string="Slider name", required=True,
                       translate=True,
                       help="Name for your Slider")
    active = fields.Boolean(string="Active", default=True)
    # category = fields.Many2many('product.public.category', string="Categories")
    category_product_ids = fields.One2many('product.category.line', 'slider_id',  string="Slider")

# class ProductTemplate(models.Model):
#    _inherit = 'product.template'

#    public_cat_id = fields.Many2one('product.category.line', string="Categories")

class ProductCategoryLine(models.Model):
	_name = 'product.category.line'
	public_cat_id = fields.Many2one('product.public.category', string="Public Categories")
	product_id = fields.Many2many('product.template', string="Products")
	slider_id = fields.Many2one('oca.slider.config')
# class ProductPublicCategory(models.Model):
#    _inherit = 'product.public.category'

#    product_id = fields.One2many('product.category.line','product_id', string="Products")


