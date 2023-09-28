from django.db import models

# Create your models here.

class Notes(models.Model):  

    note_id = models.IntegerField()
    note_title = models.CharField(max_length=50)
    note_desc = models.CharField(max_length=1000)
   
