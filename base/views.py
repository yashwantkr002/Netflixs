from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib import messages
from Account.models import *
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
import random
from base.email import send_Email
# Create your views here.
def loginpage(request):
    if request.method=="POST":
        username=request.POST['email']
        password=request.POST['password']
        user=authenticate(username=username,password=password)
        if user is not None:
            profile=Profile.objects.get(email=username)
            if profile.is_email_verified==True:
                login(request,user)
                return redirect('/')
            else:
                request.session['email'] =username
                return redirect('/otp/')
                
        else:
            messages.error(request,"Invalid Credentials")
            return redirect('/login/')
    return render(request,'login.html',{'css':'login'})

def registerpage(request):
    if request.method=='POST':
        email=request.POST['email']
        number=request.POST['number']
        password=request.POST['password']
        cpassword=request.POST['cpassword']

        obj=User.objects.filter(username=email)
        if obj.exists():
          messages.error(request, "Your account is allredy created")
          return redirect('/register/')
        else:
            if password==cpassword:
                user=User.objects.create_user(username=email,email=email)
                user.set_password(password)
                user.save()
                request.session['email'] =email
                return redirect('/otp/')
            else:
                messages.error(request, "password dose not metch")
                return redirect('/register/')
    return render(request,'sinup.html',{'css':'singup'})

def forget(request):
    otp=random.randint(1000,9999)
    if request.method=="POST":
        email=request.POST['email']
        number=request.POST['mobile_no']
        if email:
            user=User.objects.filter(email=email)
            if user.exists():
                profile=Profile.objects.get(email=email)
                profile.email_otp=otp
                profile.save()
                send_Email(email,otp)
                request.session['email'] =email
                return redirect('/forget_otp/')
            else:
                messages.error(request, "Email is not registered")
                return redirect('/forget/')
        else:
            print(number)
    return render(request,'forget.html',{'css':'forget'})

def forget_otp(request):
    email=request.session['email']
    profile=Profile.objects.get(email=email)
    if request.method=='POST':
        vel1=request.POST['vel1']
        vel2=request.POST['vel2']
        vel3=request.POST['vel3']
        vel4=request.POST['vel4']
        otp=str(vel1)+str(vel2)+str(vel3)+str(vel4)
        if profile.is_email_verified==True:
            if otp==str(profile.email_otp):
               request.session['email'] =email
               return redirect('/forgetpass/')
            else:
                messages.error(request, "Invalid OTP")
                return redirect('/forget_otp/')
        else:
            if otp==str(profile.email_otp):
                profile.is_email_verified=True
                profile.save()
                request.session['email'] =email
                return redirect('/forgetpass/')
    return render(request,'otp.html',{'css':'otp'})

def forget_update_pass(request):
    email=request.session['email']
    if request.method=="POST":
        password=request.POST['newpassword']
        cpassword=request.POST['cnewpassword']
        if password==cpassword:
            user=User.objects.get(email=email)
            user.set_password(password)
            user.save()
            return redirect('/login/')
        else:
            messages.error(request, "Password and Confirm Password are not same")
            return redirect('/forget_update_pass/')
    return render(request,'forget_update_pass.html',{'css':'forget_update_pass'})

@login_required(login_url='/login/')
def index(request):
    return render(request,'index.html',{'css':'index'})

# update passwor function
@login_required(login_url='/login/')
def updatepass(request):
    if request.method=="POST":
        oldpassword=request.POST['oldpass']
        newpassword=request.POST['newpassword']
        cnewpassword=request.POST['cnewpassword']
        Username=request.user
        if newpassword==cnewpassword:
            user = authenticate(username=Username, password=oldpassword)
            if user is not None:
                u = User.objects.get(username=Username)
                u.set_password(newpassword)
                u.save()
                messages.success(request, "Password updated successfully")
                return redirect('/updatepass/')
            else:
                messages.error(request, "Old password is incorrect")
                return redirect('/updatepass/')
        else:
            messages.error(request, "New password dose not match")
            return redirect('/updatepass/')
    return render(request,'updatepass.html',{'css':'updatepass'})

# otp for backend
def otp(request):
    email=request.session['email']
    profile=Profile.objects.get(email=email)
    if profile.is_email_verified==True:
        return redirect('/')
    else:
        if request.method=='POST':
            vel1=request.POST['vel1']
            vel2=request.POST['vel2']
            vel3=request.POST['vel3']
            vel4=request.POST['vel4']
            otp=str(vel1)+str(vel2)+str(vel3)+str(vel4)

            if otp==profile.email_otp:
               profile.is_email_verified=True
               profile.save()
               return redirect('/login/')
            else:
                messages.error(request, "Invalid OTP")
                return redirect('/otp/')

    return render(request,'otp.html',{'css':'otp'})

@login_required(login_url='/login/')
def play(request,slag):
    return render(request,'play.html',{'slag':slag})

@login_required(login_url='/login/')
def logoutpage(request):
    logout(request)
    return redirect('/login/')

@login_required(login_url='/login/')
def profile_display(request):
    user=request.user.username
    pic=Profile.objects.filter(email=user)
    pick=pic[0]
    data=User.objects.filter(username=user)
    dataa=data[0]
    if request.method=="POST":
        fname=request.POST['fname']
        lname=request.POST['lname']
        photo=request.FILES.get('photo')
        if(photo):
            pick.profile_picture=photo
            pick.save()
        dataa.first_name=fname
        dataa.last_name=lname
        dataa.save()
        return redirect('/profile/')
    return render(request,'profile_display.html',{'css':'profile_display','pic':pick,'data':dataa})
