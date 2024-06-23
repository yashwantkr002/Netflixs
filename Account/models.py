from typing import Any
from django.db import models
from django.contrib.auth.models import User
from base.models import *
from django.dispatch import receiver
from django.db.models.signals import post_save
import random
from base.email import send_Email
# Create your models here.

class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=100 ,null=True)
    email = models.CharField(max_length=100, unique=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    email_otp = models.CharField(max_length=6, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures', default='profile_pictures/default.jpg')
    
    def __str__(self):
        return str(self.user)
    
@receiver(post_save,sender=User)
def create_profile(sender,instance,created,**kwargs):
    try:
        if created:
            otp=random.randint(1000,9999)
            Profile.objects.create(user=instance,email=instance.email,email_otp=otp)
            send_Email(instance.email,otp)
    except Exception as e:
        print(e)