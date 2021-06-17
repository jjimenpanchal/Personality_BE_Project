import pickle
import pandas as pd
import numpy as np
from nltk.stem import WordNetLemmatizer
import gc
import itertools
import re
import string
import time
import warnings
from collections import Counter, defaultdict
from random import choice
from nltk.corpus import stopwords
from sklearn.preprocessing import MinMaxScaler
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import urllib.request
import json
import urllib

def fun():
    models= ['m1','m2','m3','m4']
    filename = ['finalized_model1.sav','finalized_model2.sav','finalized_model3.sav','finalized_model4.sav']
    for i in range(4):
        models[i] = pickle.load(open(filename[i], 'rb'))
        
        
    loaded_tfidf = pickle.load(open('tfidf.sav', 'rb'))
    loaded_minmax = pickle.load(open('minmax.sav', 'rb'))


    f = open("Comments.txt", "r")
    bb=f.read()
    title=''
    #change to yours VideoID or change url inparams
    VideoID = "o1Y4Z0oh1GE" 

    params = {"format": "json", "url": "https://www.youtube.com/watch?v=%s" % VideoID}
    url = "https://www.youtube.com/oembed"
    query_string = urllib.parse.urlencode(params)
    url = url + "?" + query_string

    with urllib.request.urlopen(url) as response:
        response_text = response.read()
        data = json.loads(response_text.decode())
        #pprint.pprint(data)
        title=data['title']
    Dict = {}
    Dict['name']=title
    Dict['posts']=bb
    cb = pd.DataFrame(Dict,index=[0])


    cb['avg_comment_length'] = cb['posts'].apply(lambda x: len(x.split())/50)
    cb['comment_length_var'] = cb['posts'].apply(lambda x: np.var(
        [len(sentence.split()) for sentence in x.split('|||')]))
        
        
    def post_preprocess(df):
        i = 0
        post_list = []
        length = len(df)
        lemmatiser = WordNetLemmatizer()
        print('Processing... Be patient')

        for row in df.iterrows():
            # Progress bar
            i += 1
            if (i % 500 == 0 or i == length):
                print(f"Progress bar：{round(i/length*100)}%")
            # clean the posts
            posts = row[1].posts
            posts = re.sub(r'\|\|\|', ' ', posts)
            posts = re.sub(r'http[\S]*', '', posts).lower()
            posts = re.sub("[^a-z\s]", ' ', posts)
            posts = ' '.join([lemmatiser.lemmatize(w) for w in posts.split(
                ' ') if w not in stopwords.words('english')])
            types=['infj', 'entp', 'intp', 'intj', 'entj', 'enfj', 'infp', 'enfp', 'isfp', 'isfj', 'istj', 'estp', 'esfp', 'estj', 'esfj']
            # Removing personality types
            for t in types:
                posts = posts.replace(t, '')
            post_list.append(posts)

        return np.array(post_list)
        
    processed_post_p = post_preprocess(cb)
    word_tfidf_p = loaded_tfidf.transform(processed_post_p)
    word_tfidf_df_p = pd.DataFrame(
        data=word_tfidf_p.toarray(), columns=loaded_tfidf.get_feature_names())



    analyzer = SentimentIntensityAnalyzer()
    scores = []
    length_p = len(cb)
    for i in range(length_p):
        score = analyzer.polarity_scores(processed_post_p[i])['compound']
        scores.append(score)
    cb['Sentiment'] = scores


    ellipses_count = [len(re.findall(r'\.\.\.\|\|\|', posts))
                    for posts in cb['posts']]
    cb['Ellipses'] = ellipses_count
    #
    exclamation_count = [len(re.findall(r'!', posts)) for posts in cb['posts']]
    cb['Exclamation'] = exclamation_count
    #
    # Create a list of question count per user.
    question_count = [len(re.findall(r'\?', posts)) for posts in cb['posts']]
    # Append to dataframe
    cb['Question'] = question_count
    #
    user_posts = [re.sub(r'\|\|\|', ' ', posts) for posts in cb['posts']]
    link_count = [len(re.findall(r'http[\S]* ', posts)) for posts in user_posts]
    cb['Links'] = link_count
    # picture and emo
    question_count = [len(re.findall(r'(\.png)|(\.jpg)', posts))
                    for posts in cb['posts']]
    cb['Picture'] = question_count
    def find_emoji(text):
        # REMOVE LATER ON
        text = text.lower()

        text = re.sub(r'\|\|\|', ' ', text)

        slack_style_emojies = re.findall(r':[\w\d]+(\-[\w\d]+)?:', text)
        text_style_emojies = re.findall(r':[\-|\s]?[d|\)|\(|p]', text)

        return slack_style_emojies + text_style_emojies
    cb['Emojies'] = cb['posts'].map(lambda x: len(find_emoji(x)))
    # Upper
    def del_punct(text):
        regex = re.compile('[' + re.escape(string.punctuation) + '\\r\\t\\n]')
        return regex.sub("", text)
    temp = cb['posts'].apply(lambda x: del_punct(x))
    cb['Upper'] = temp.apply(lambda x: len([x for x in x.split() if x.isupper()]))
    # clean and scale
    cb.fillna(value=0, inplace=True)

    sentiment_scaled = loaded_minmax.transform(np.array(cb['Sentiment']).reshape(-1, 1))
    cb['Sentiment'] = sentiment_scaled

    X_tf_p = pd.concat([cb.iloc[:, 2:], word_tfidf_df_p], axis=1)

    trans_list = [{0: 'I', 1: 'E'}, {0: 'N', 1: 'S'},
                    {0: 'F', 1: 'T'}, {0: 'J', 1: 'P'}]
    def translate_back(personality):
            s = ""
            ans=""
            for i in range(4):
                p=personality[i]
                ans+=trans_list[i][p]
                # print(trans_list[i][p])
            return ans
                
    y=[]
    for i in range(4):
        y.append(int(models[i].predict(X_tf_p)))
    return translate_back(y)            
