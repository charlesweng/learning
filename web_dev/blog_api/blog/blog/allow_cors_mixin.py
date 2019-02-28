from django.http import HttpResponse

class AllowCORSMixin:

  def add_access_control_headers(self, response):
    response["Access-Control-Allow-Origin"] = 'http://localhost:8080'
    response["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
