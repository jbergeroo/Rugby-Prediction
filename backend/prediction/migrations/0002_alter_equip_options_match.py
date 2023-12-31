# Generated by Django 4.2.4 on 2023-08-22 22:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prediction', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='equip',
            options={'ordering': ('group',)},
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('state', models.CharField(choices=[('Group match', 'Group match'), ('Quarter Final', 'Quarter Final'), ('Semi Final', 'Semi Final'), ('Little Final', 'Little Final'), ('Final', 'Final')], max_length=100)),
                ('played', models.BooleanField(default=False)),
                ('score', models.CharField(default='', max_length=10)),
                ('equip_a', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='equipeA', to='prediction.equip')),
                ('equip_b', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='equipeB', to='prediction.equip')),
            ],
            options={
                'ordering': ('date',),
            },
        ),
    ]
