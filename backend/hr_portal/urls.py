from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Welcome to Job Portal API!"})

urlpatterns = [
    path('', home),  # <-- this handles the empty path
    path('admin/', admin.site.urls),
    path('api/', include('jobportal.urls')),
]
