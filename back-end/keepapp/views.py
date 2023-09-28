from django.shortcuts import render
from .models import Notes
from .serializers import NoteSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Max
from .entities import ReturnModel
import json
# Create your views here.


def home(request):
        return Response('index.html')

@api_view(['GET'])
def getNote(self):
        model = ReturnModel()
        arr = Notes.objects.all()
        serializer = NoteSerializer(arr , many=True)
        model.setCode(202)
        model.setMessage('Welcome to the Google Keep')
        return Response(serializer.data , status=status.HTTP_202_ACCEPTED)


@api_view(['DELETE'])
def delNote(self , id):

        note_count = Notes.objects.filter(note_id = id).count()
        model = ReturnModel()
        if note_count > 0 :
                arr = Notes.objects.get(note_id = id)
                Notes.delete(arr)
                model.setCode(200)
                model.setMessage('Data has been succesfully Deleted')
                model.setValue(str(id))
                return Response(json.dumps(model.__dict__) , status=status.HTTP_200_OK)
        else:   
                model.setCode(204)
                model.setMessage('There is some error in deleting data')
                model.setValue(str(id))
                return Response(json.dumps(model.__dict__), status=status.HTTP_204_NO_CONTENT)
        
@api_view(['POST'])
def addNote(request):
        
        serializer = NoteSerializer(data=request.data)
        model = ReturnModel()
        if serializer.is_valid():
                id = 0
                if(Notes.objects.count() == 0):
                        id = 1
                else:
                        id = Notes.objects.aggregate(Max('note_id'))['note_id__max']
                        id = id + 1
                
                serializer.validated_data['note_id'] = id
                print(id)
                serializer.save()
                model.setCode(200)
                model.setMessage('Data has been added succesfully')
                model.setValue(str(id))
                return Response(serializer.data , status=status.HTTP_200_OK)
        else:
                model.setCode(201)
                model.setMessage('There is some error while adding data')
                model.setValue(str(id))
                return Response("error" ,status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def updateNote(request , id):
         arr = Notes.objects.get(note_id = id)
         model = ReturnModel()
         serializer = NoteSerializer(arr , data=request.data)
         if serializer.is_valid():
                serializer.validated_data['note_id'] = id
                serializer.save()
                model.setCode(200)
                model.setMessage('Data is succesfully updated')
                model.setValue(str(id))
                return Response(json.dumps(model.__dict__) ,status=status.HTTP_200_OK)
         else :
                model.setCode(201)
                model.setMessage('There is some error in updating the data')
                model.setValue(str(id))
                return Response(json.dumps(model.__dict__ ),status=status.HTTP_201_CREATED)

 







