from django.urls import path
from .views import GetEquip

app_name = 'predictions'

urlpatterns = [
    path('equip/<int:pk>/', GetEquip.as_view({'get': 'list'}), name="get_equip"),
    path('equip/', GetEquip.as_view({'get': 'list', 'post' : 'create'}), name="equip"),
]