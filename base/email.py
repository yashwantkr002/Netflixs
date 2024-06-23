
from django.conf import settings
from django.core.mail import send_mail

def send_Email(email,otp):
    subject=f'Veryfication otp'
    message=f'your account veryfication otp is {otp}'
    email=email
    sender=settings.EMAIL_HOST_USER
    recipient_list=[email]
    send_mail(subject,message,sender,recipient_list,fail_silently=False)