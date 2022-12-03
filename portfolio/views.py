from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.db import IntegrityError
from django.contrib.auth.models import User
# Create your views here.
def home(request):
    return render(request, 'home.html')
def portfolio(request):
    return render(request,'portfolio.html')
def projects(request):
    return render(request, 'projects.html')
def games(request):
    return render(request, 'games.html')
def bouncing_balls(request):
    return render(request, 'projects/bouncing_balls.html')
def startwars(request):
    return render(request, 'games/starwars.html')
def signup(request):
    if request.method=='GET':
        return render(request,'signup.html',{
            'form': UserCreationForm
        })
    else:
        if request.POST['password1']==request.POST['password2']:
            try:
                #registrar usuario
                user=User.objects.create_user(
                    username=request.POST['username'],
                    password=request.POST['password1']
                )
                user.save()
                login(request,user)
                return redirect('home')
            except IntegrityError:
                return render(request,'signup.html',{
                    'form': UserCreationForm,
                    'error': 'User exists'
                })
        return render(request,'signup.html',{
            'form':  UserCreationForm,
            'error': 'Password doesnt match'
        })