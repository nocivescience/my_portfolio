from django.shortcuts import render

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