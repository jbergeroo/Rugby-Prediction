from django.urls import path
from .views import CustomUserCreate, GetCustomUser

app_name = 'users'

urlpatterns = [
    path('', GetCustomUser.as_view(), name="get_current_user"),
    path('create/', CustomUserCreate.as_view(), name="create_user")
]