from openerp import api, fields, models

class OcaSlider(models.Model):
    _name = 'oca.slider.config'

    name = fields.Char(string="Slider name", required=True,
                       translate=True,
                       help="Name for your Slider")
    active = fields.Boolean(string="Active", default=True)
    category_product_ids = fields.One2many('product.category.line', 'slider_id',  string="Slider")
    color = fields.Char(string="Color",help="Choose your color",size=7)

class ProductCategoryLine(models.Model):
  _name = 'product.category.line'
  name = fields.Char(string="Collection name", required=True,translate=True,help="Name for your Slider")
  public_cat_id = fields.Many2one('product.public.category', string="Category Reference")
  product_id = fields.Many2many('product.template', string="Products to Display")
  slider_id = fields.Many2one('oca.slider.config')
