from openerp import api, fields, models
from datetime import timedelta
import logging

_logger = logging.getLogger(__name__)

# Oca Slider Single
class OcaSlider(models.Model):
  _name = 'oca.slider.config'

  name = fields.Char(string="Slider name", required=True, translate=True, help="Name for your Slider")
  active = fields.Boolean(string="Active", default=True)
  category_product_ids = fields.One2many('product.category.line', 'slider_id',  string="Slider")
  color = fields.Char(string="Color",help="Choose your color",size=7)

class ProductCategoryLine(models.Model):
  _name = 'product.category.line'

  name = fields.Char(string="Collection name", required=True,translate=True,help="Name for your Slider")
  public_cat_id = fields.Many2one('product.public.category', string="Category Reference")
  product_id = fields.Many2many('product.template', string="Products to Display")
  slider_id = fields.Many2one('oca.slider.config')

# Oca Multi Slider
class OcaMultiProductSlider(models.Model):
  _name = 'oca.multi.product.config'

  name = fields.Char(string="Slider Name", required=True,translate=True, help="Name of Slider")
  active = fields.Boolean(string="Active", default=True)
  tab_line = fields.One2many('oca.tab.line', 'line_id', string="Collection Line")
  rows_number = fields.Selection([('1','1'),('2','2'),('3','3')], string="Number of rows", default='1', required=True, help="Number of rows to show per product")
  col_number = fields.Selection([('2','2'),('3','3'),('4','4'),('5','5')], string="Number of colums", default='4', required=True, help="Number of colums to show per product")

class OcaTabLine(models.Model):
  _name = 'oca.tab.line'

  line_id = fields.Many2one('oca.multi.product.config', string="Collection Reference", required=True, ondelete="cascade", select=True, readonly=True)
  tab_name = fields.Char(string="Collection Name", required=True, help="Name of the Collection")
  product_id = fields.Many2many('product.template', string="Products", domain=['&',('sale_ok','=',True),('website_published','=',True)], required=True)
  sequence = fields.Integer(string="Sequence", help="Gives the sequence of the collections", readonly=True)
  
#Oca Deals Slider
class OcaDeals(models.Model):
  _name = 'oca.product.deals'

  name = fields.Char(string="Deal Name", required=True, translate=True, help="Name of the deal to show on the snippet")
  active = fields.Boolean(string="Active", default=True)
  deals_line = fields.One2many('oca.deals.line', 'line_id', string="Deals Line")


class OcaDealsLine(models.Model):
  _name = 'oca.deals.line'

  line_id = fields.Many2one('oca.product.deals', string="Deals Reference", required=True, ondelete="cascade", select=True, readonly=True)
  product_id = fields.Many2one('product.template', string="Product", domain=['&',('sale_ok','=',True),('website_published','=',True)], required=True)
  product_countdown = fields.Datetime(string="Deal Until", select=True, required=True)
  sequence = fields.Integer(string="Sequence", help="Gives the sequence of the deals order", readonly=True)

# Mega Menu Model
class WebsiteMenu(models.Model):
  _inherit = 'website.menu'

  is_megamenu = fields.Boolean(String="Is megamenu...?")
  megamenu_type = fields.Selection([('2_col', '2 Columns'), ('3_col','3 Columns'), ('4_col','4 Columns'),('5_col','5 Columns')], default="3_col", string="Megamenu type")
  website_menu_line_id = fields.One2many('website.menu.line', 'website_menu_id', string="Public Category")

class WebsiteMenuLine(models.Model):
  _name = 'website.menu.line'
  website_menu_id = fields.Many2one('website.menu')
  cat_id_root = fields.Many2one('product.public.category', string="Root Category")
  cat_id_child = fields.Many2many('product.public.category', string="Child Category", domain="[('parent_id','=',cat_id_root)]")

  # @api.onchange('cat_id_root')
  # def _get_category_id(self):
  #   logging.warning(self.cat_id_root.id)
  #   res = {}
  #   res['domain'] = {
  #     'cat_id_child': [('parent_id', '=', self.cat_id_root.id)]
  #   }
  #   return res
