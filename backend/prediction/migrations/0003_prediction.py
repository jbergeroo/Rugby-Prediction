# Generated by Django 4.2.4 on 2023-08-23 22:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('prediction', '0002_alter_equip_options_match'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score_a', models.IntegerField()),
                ('score_b', models.IntegerField()),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='match', to='prediction.match')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]