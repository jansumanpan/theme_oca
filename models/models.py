from openerp import api, fields, models
import logging

_logger = logging.getLogger(__name__)
# Oca SLider Model

class OcaSlider(models.Model):
    _name = 'oca.slider.config'

    name = fields.Char(string="Slider name", required=True,
                       translate=True,
                       help="Name for your Slider")
    active = fields.Boolean(string="Active", default=True)
    # category = fields.Many2many('product.public.category', string="Categories")
    category_product_ids = fields.One2many('product.category.line', 'slider_id',  string="Slider")
    color = fields.Char(string="Color",help="Choose your color",size=7)

# class ProductTemplate(models.Model):
#    _inherit = 'product.template'

#    public_cat_id = fields.Many2one('product.category.line', string="Categories")

class ProductCategoryLine(models.Model):
  _name = 'product.category.line'
  name = fields.Char(string="Collection name", required=True,translate=True,help="Name for your Slider")
  public_cat_id = fields.Many2one('product.public.category', string="Category Reference")
  product_id = fields.Many2many('product.template', string="Products to Display")
  slider_id = fields.Many2one('oca.slider.config')

# Mega Menu Model
class WebsiteMenuLine(models.Model):
  _name = 'website.menu.line'
  website_menu_id = fields.Many2one('website.menu')
  cat_id_root = fields.Many2one('product.public.category', string="Root Category")
  cat_id_child = fields.Many2many('product.public.category', string="Child Category", domain="[('parent_id','=',cat_id_root)]")

  @api.onchange('cat_id_root')
  def _get_category_id(self):
    logging.warning(self.cat_id_root.id)
    res = {}
    res['domain'] = {
      'cat_id_child': [('parent_id', '=', self.cat_id_root.id)]
    }
    return res


class WebsiteMenu(models.Model):
   _inherit = 'website.menu'

   is_megamenu = fields.Boolean(string='Is megamenu...?')
   megamenu_type = fields.Selection([('2_col', '2 Columns'),('3_col', '3 Columns'),('4_col', '4 Columns'),('5_col', '5 Columns')],default='3_col',string="Megamenu type")
   website_menu_line_id = fields.One2many('website.menu.line', 'website_menu_id', string="Public Category")

