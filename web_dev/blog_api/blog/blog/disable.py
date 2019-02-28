from django.utils.deprecation import MiddlewareMixin
from .allow_cors_mixin import AllowCORSMixin

class DisableCSRF(MiddlewareMixin, AllowCORSMixin):

    def __init__(self, get_response):
      self.get_response = get_response

    def process_request(self, request, *args, **options):
      setattr(request, '_dont_enforce_csrf_checks', True)

    def __call__(self, request):
      response = self.get_response(request)
      self.add_access_control_headers(response)
      return response
