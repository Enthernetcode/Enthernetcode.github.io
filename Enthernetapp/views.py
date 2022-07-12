from django.shortcuts import render

# Create your views here.
def index(request):

				"""The home page for Enthernetapp."""

				return render(request, 'Enthernetapp/index.html')

