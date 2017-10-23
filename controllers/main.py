import json
import logging
from openerp import http
import base64
from openerp.http import request
from openerp.addons.website.models.website import slug
from openerp.addons.website_sale.controllers import main
from openerp.addons.website_sale.controllers import main as main_shop
from openerp.addons.website_sale.controllers.main import QueryURL
from openerp.addons.website_sale.controllers.main import website_sale
from openerp.addons.website_sale.controllers.main import table_compute
from openerp.exceptions import Warning

_logger = logging.getLogger(__name__)

class OcaSliderSettings(http.Controller):

	@http.route(['/theme_oca/oca_slider_settings'], type='json', auth='public', website=True)
	def index(self):
		values = []
		option = request.env['oca.slider.config'].sudo().search([('active', '=', True)], order="name asc")
		_logger.warning(option)
		for record in option:
			values.append({'id': record.id,'name': record.name})
		return values

	@http.route(['/theme_oca/oca_get_cat'], type='http', auth='public', website=True)
	def get_oca_categ(self, **post):
		if post.get('slider-type'):
			slider_header = request.env['oca.slider.config'].sudo().search([('id', '=', int(post.get('slider-type')))])
			_logger.warning(slider_header)
			slider_categ_ids = request.env['product.category.line'].sudo().search([('slider_id', '=', slider_header.id)])
			values = {
				'slider_header': slider_header,
				'slider_categ_ids':slider_categ_ids
				}
			# categ_ids = request.env['product.public.category'].sudo().search([('id', 'in', slider_categ_ids.public_cat_id)])
			# for slider_categ_id in slider_categ_ids:
			# 	values.update({'slider_categ_id':slider_categ_id})
			return request.website.render("theme_oca.display_categories", values)

	@http.route(['/theme_oca/oca_get_prod'], type='http', auth='public', website=True)
	def get_oca_prod(self, **post):
		if post.get('data_id'):
			values = {}
			slider_categ_ids = request.env['product.category.line'].sudo().search([('id', '=', int(post.get('data_id')))])
			_logger.warning(slider_categ_ids)
			products_arr = [p_id.id for p_id in slider_categ_ids.product_id]
			# products = request.env['product.template'].sudo().search(['&',('id', 'in', products_arr),('website_published', '=',True)])
			_logger.warning(products_arr)
			products = request.env['product.template'].sudo().search(['&',('id', 'in', products_arr),('website_published', '=',True)])
			# categ_ids = request.env['product.public.category'].sudo().search([('id', 'in', slider_categ_ids.public_cat_id)])
			_logger.warning(products)
			values = {
				'products': products
			}
			# for product in products:
			# 	values.update({product.id:{'name':product.name,'image':product.image,}})
			return request.website.render("theme_oca.display_products", values)