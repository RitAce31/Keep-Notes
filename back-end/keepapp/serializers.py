from dataclasses import fields
from rest_framework import serializers
from .models import Notes

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = (
            'note_id', 'note_title' , 'note_desc'
        )