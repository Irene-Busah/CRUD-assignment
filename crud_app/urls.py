from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('get-all-users/', views.get_all_users),
    path('post-user/', views.add_user),
    path('get_user/<str:id>/', views.get_user),
    path('update_user/<int:id>/', views.update_user),
    path('delete_user/<int:id>/', views.delete_user),
    path('request-logs/', views.request_logs, name='request-logs'),
    path('get-logs/', views.get_logs, name='get-logs'),
]