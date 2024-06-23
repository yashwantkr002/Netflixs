from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('',index,name='index'),
    path('play/<slag>',play,name="play" ),
    path('login/',loginpage,name='login'),
    path('register/',registerpage,name='register'),
    path('forget/',forget,name="forget"),
    path('forgetpass/',forget_update_pass,name="forgetpass"),
    path('forget_otp/',forget_otp,name="forget_otp"),
    path('otp/',otp,name="otp"),
    path('updatepass/',updatepass,name="updatepass"),
    path('logout/',logoutpage,name='logout'),
    path('profile/',profile_display,name='profile'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)