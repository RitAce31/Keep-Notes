# Generated by Django 4.2.4 on 2023-09-12 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('keepapp', '0004_alter_notes_note_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notes',
            name='note_id',
            field=models.IntegerField(unique=True),
        ),
    ]
