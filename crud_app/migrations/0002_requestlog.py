# Generated by Django 4.2.6 on 2023-10-15 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('method', models.CharField(max_length=10)),
                ('path', models.CharField(max_length=255)),
                ('remote_addr', models.GenericIPAddressField()),
            ],
        ),
    ]
