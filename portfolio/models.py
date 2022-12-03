from django.db import models
# Create your models here.
class Contact(models.Model):
    Name= models.CharField(max_length=15)
    Surname= models.CharField(max_length=15)
    Message= models.TextField()
    def __str__(self):
        return self.Name