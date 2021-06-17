from django import http
from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from .types import types 
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Type
from .serializers import TypeSerializer
import sys
import csv
from .Personality_data import data
from . import youtube_comm
from . import tweet_to_mbti
from .youtube import fun
from .text_to_personality import text_to_p
#http://www.tweepy.org/
import tweepy

idx_of_types={
    'ISTJ':0,
    'ISTP':1,
    'ISFJ':2,
    'ISFP':3,
    'INFJ':4,
    'INFP':5,
    'INTJ':6,
    'INTP':7,
    'ESTP':8,
    'ESTJ':9,
    'ESFP':10,
    'ESFJ':11,
    'ENFP':12,
    'ENFJ':13,
    'ENTP':14,
    'ENTJ':15

}
#Get your Twitter API credentials and enter them here
consumer_key = '5PhijOfFwIpiSIoKpBZLitR9F'
consumer_secret = 'ufgpIrGG0xgLuJX5y9H0bkE0J23UtoHlU8iy52hXVTUeltvq0w'
access_key = '1339121366243500034-nowwL1t1q8BzkamZGtnthOvFo4mkQ3'
access_secret = 'FEN3aA8HokKq4rqz6213NmiXtMQuJ4KE7ElIUBdAVqeD7'


# Create your views here.

def getroutes(request):
    return JsonResponse("Hello World ",safe=False)

@api_view(['GET'])
def gettypes(request):
    # types=Type.objects.all()
    # serializer=TypeSerializer(types,many=True)
    # print(serializer.data)
    # print(data)
    return JsonResponse(data,safe=False)
    # return Response(serializer.data)

@api_view(['GET'])
def gettype(request,title):
    ans=Type.objects.get(title=title)
    serializer=TypeSerializer(ans,many=False)


    return Response(serializer.data)
def get_tweets(username):

    #http://tweepy.readthedocs.org/en/v3.1.0/getting_started.html#api
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)
    api = tweepy.API(auth)

    #set count to however many tweets you want
    number_of_tweets = 50

    #get tweets
    tweets_for_csv = []

    try:
        for tweet in tweepy.Cursor(api.user_timeline, screen_name = username).items(number_of_tweets):
            #create array of tweet information: username, tweet id, date/time, text
            tweets_for_csv.append([username, tweet.id_str, tweet.created_at, tweet.text.encode("utf-8")])
    except:
        return False
    #write to a new csv file from the array of tweets
    outfile ="tweets.csv"
    print ("writing to " + outfile)
    with open(outfile, 'w+') as file:
        writer = csv.writer(file, delimiter=',')
        writer.writerows(tweets_for_csv)
    return True


@api_view(['POST'])
def twitter(request):
    # print(request.data, "jimen")
    temp=list(request.data.keys())
    username=temp[0]

    isExist=get_tweets(username)
    ans={'ans':"UserName Does Not exist/ Account  Is Private"}
    print("ISexiist val out", isExist)
    if isExist:
        print("ISexiist val", isExist)
        ans=tweet_to_mbti.tweet_to_mbti()
        ans=search_type_by_title(ans)
    # fa={
    #     "isExist":isExist,
    #     "ans":ans
    # }
    # print(ans)
    # print('returning data', ans)
    return JsonResponse(ans, safe=False)
    # username="BeerBicepsGuy"
    # get_tweets(username)

@api_view(['POST'])
def youtube(request):
    temp=list(request.data.keys())
    video_link=temp[0]+"="+(list(request.data.values())[0])
    print("keyis arre",request.data)
    f = open("URL_list.txt", "w")
    f.write(video_link)
    f.close()
    f = open("Comments.txt", "w")
    # f.write(video_link)
    f.close()
    ans={'ans':"Url Does Not exist /Comments are off"}
    # print("comments storing")
    if not youtube_comm.main1():
        return JsonResponse(ans, safe=False)
    # print("comments storeddd")
    ans=fun()
    # print("ans found")
    ans=search_type_by_title(ans)
    return JsonResponse(ans, safe=False)

def search_type_by_title(title):
    idx=idx_of_types[title]
    return data[idx]
    # return data[0]

@api_view(['POST'])
def text_to_personality(request):
    temp=list(request.data.keys())
    print(temp)
    f = open("text.txt", "w")
    f.write(temp[0])
    f.close()
    ans=text_to_p()
    ans=search_type_by_title(ans)
    return JsonResponse(ans, safe=False)
    # print("ans is hahah ",ans)
    # return HttpResponse(ans)
