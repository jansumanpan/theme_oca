# -*- coding: utf-8 -*-
from openerp import http

# class ThemeOca(http.Controller):
#     @http.route('/theme_oca/theme_oca/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/theme_oca/theme_oca/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('theme_oca.listing', {
#             'root': '/theme_oca/theme_oca',
#             'objects': http.request.env['theme_oca.theme_oca'].search([]),
#         })

#     @http.route('/theme_oca/theme_oca/objects/<model("theme_oca.theme_oca"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('theme_oca.object', {
#             'object': obj
#         })