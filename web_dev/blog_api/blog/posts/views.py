import json
import sys

from django.http import JsonResponse, HttpResponseNotFound, HttpResponseServerError, HttpResponse
from django.views import View
from .models import Post
from blog.allow_cors_mixin import AllowCORSMixin

class PostView(View, AllowCORSMixin):
  server_error = HttpResponseServerError("Internal server error.")

  def get(self, request, post_id = None, *args, **kwargs):
    if post_id == None:
      return self.index(request)
    else:
      return self.detail(request, post_id)

  # TODO Setup HTTPS and remove csrf_exempt
  def post(self, request, *args, **kwargs):
    bad_response = self.server_error
    try:
      unicode_body = request.body.decode('utf-8')
      body = json.loads(unicode_body)
      new_post = Post(title=body['title'], categories=body['categories'], content=body['content'])
      new_post.save()
      return HttpResponse(unicode_body, content_type="application/json")
    except:
      bad_response_text = sys.exc_info()[1]

    return JsonResponse({
      'status': bad_response.status_code,
      'error_message': bad_response_text
    })

  def delete(self, request, post_id, *args, **kargs):
    bad_response = self.server_error
    try:
      post = Post.objects.get(pk=post_id)
      post.delete()
      return JsonResponse({
        'id': post_id,
        'title': post.title,
        'categories': post.categories,
        'content': post.content
      })
    except:
      bad_response_text = sys.exc_info()[1]

    return JsonResponse({
      'status': bad_response.status_code,
      'error_message': bad_response_text
    })



  def index(self, request):
    posts = list(Post.objects.order_by('-id').values())
    return JsonResponse(posts, safe=False)

  def detail(self, request, post_id):
    bad_response = self.server_error
    try:
      post = Post.objects.get(pk=post_id)
      return JsonResponse({
        'id': post.id,
        'title': post.title,
        'categories': post.categories,
        'content': post.content
      })
    except Post.DoesNotExist:
      bad_response = HttpResponseNotFound("Post with id " + str(post_id) + " does not exist.")

    return JsonResponse({
      'status': bad_response.status_code,
      'error_message': bad_response.content.decode('utf-8')
    })
