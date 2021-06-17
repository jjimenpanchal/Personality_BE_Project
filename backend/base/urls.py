from django.urls import path
from . import views

urlpatterns=[
    path('',views.getroutes),
    path("gettypes",views.gettypes),
    path("gettype/<str:title>/",views.gettype),
    path("twitter/",views.twitter),
    path("youtube/",views.youtube),
    path("text_to_personality/",views.text_to_personality)
    

]
