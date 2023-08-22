from django.db import models
from django.utils.translation import gettext_lazy as _

def upload_to(instance, filename):
    return 'equip/{filename}'.format(filename=filename)

class Equip(models.Model) :
    options = (
        ('a', 'A'),
        ('b', 'B'),
        ('c', 'C'),
        ('d', 'D'),
    )

    name = models.CharField(max_length=50)
    logo = models.ImageField(
        _("Image"), upload_to=upload_to)
    group = models.CharField(max_length=10, choices=options)

    class Meta:
        ordering = ('group',)

    def __str__(self) :
        return self.name
    
class Match(models.Model) :
    options = (
        ('Group match', 'Group match'),
        ('Quarter Final', 'Quarter Final'),
        ('Semi Final', 'Semi Final'),
        ('Little Final', 'Little Final'),
        ('Final', 'Final')
    )
    
    equip_a = models.ForeignKey(
        Equip, on_delete=models.CASCADE, related_name='equipeA')
    equip_b = models.ForeignKey(
        Equip, on_delete=models.CASCADE, related_name='equipeB')
    date = models.DateField()
    state = models.CharField(max_length=100, choices=options) # match de poule, demi-final..
    played = models.BooleanField(default=False)
    score = models.CharField(max_length=10, default="")

    class Meta: 
        ordering = ('date',)

    def __str__(self) :
        return '{} - {}'.format(self.equip_a.name, self.equip_b.name)