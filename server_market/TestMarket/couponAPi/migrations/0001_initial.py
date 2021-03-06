# Generated by Django 3.0.8 on 2020-09-01 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Promo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('promoCode', models.CharField(max_length=128, unique=True)),
                ('startDate', models.DateField()),
                ('endDate', models.DateField()),
                ('maxLimitUser', models.IntegerField()),
                ('maxPromo', models.IntegerField()),
                ('usedPromo', models.IntegerField()),
                ('creator_email', models.EmailField(max_length=40)),
            ],
        ),
    ]
