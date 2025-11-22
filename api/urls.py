from django.urls import path
from . import views

urlpatterns = [
    # Original encryption endpoints
    path('encrypt/', views.encrypt_message, name='encrypt'),
    path('decrypt/', views.decrypt_message, name='decrypt'),
    path('key-info/', views.key_info, name='key_info'),
    path('regenerate-keys/', views.regenerate_keys, name='regenerate_keys'),
    
    # User authentication endpoints
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('current-user/', views.get_current_user, name='current_user'),
    
    # Messaging endpoints
    path('send/', views.send_message, name='send_message'),
    path('inbox/<str:username>/', views.get_inbox, name='inbox'),
    path('conversation/<str:username>/', views.get_conversation, name='conversation'),
    path('users/', views.get_all_users, name='all_users'),
    path('mark-read/<int:message_id>/', views.mark_message_read, name='mark_read'),
]
