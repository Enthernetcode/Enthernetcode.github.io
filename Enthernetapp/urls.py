from django.urls import path #importing the necessary documents

from . import views

app_name ='Enthernetapp'

urlpatterns = [
				path('', views.index, name='index'),
]
