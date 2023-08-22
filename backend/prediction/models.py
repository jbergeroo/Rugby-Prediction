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
