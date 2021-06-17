from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Type(models.Model):
    title=models.CharField(max_length=200)
    summary=models.CharField(max_length=600)
    content=models.CharField(max_length=50000)
    


    def __str__(self):
        return self.title