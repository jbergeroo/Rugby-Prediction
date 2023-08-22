from django.urls import path
from .views import GetEquip, GetMatch

app_name = 'predictions'

urlpatterns = [
    path('equip/<int:pk>/', GetEquip.as_view({'get': 'list'}), name="get_equip"),
    path('equip/', GetEquip.as_view({'get': 'list', 'post' : 'create'}), name="equip"),
    path('match/<int:pk>/', GetMatch.as_view({'get': 'list'}), name="get_match"),
    path('match/', GetMatch.as_view({'get': 'list', 'post' : 'create'}), name="match"),
]