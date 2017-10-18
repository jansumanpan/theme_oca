import json
import logging
from openerp import http
import base64
from openerp.http import request
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
		return json.dumps(values)

	@http.route(['/theme_oca/oca_get'], type='http', auth='public', website=True)
	def get_oca(self, **post):
		if post.get('slider-type'):
			slider_header = request.env['oca.slider.config'].sudo().search([('id', '=', int(post.get('slider-type')))])
			_logger.warning(slider_header)
			slider_categ_ids = request.env['product.category.line'].sudo().search([('slider_id', '=', slider_header.id)])
			# categ_ids = request.env['product.public.category'].sudo().search([('id', 'in', slider_categ_ids.public_cat_id)])
			_logger.warning(slider_categ_ids)
			values = {
				'slider_header': slider_header,
				'slider_categ_ids': slider_categ_ids

			}

			return request.website.render("theme_oca.display_categories", values)