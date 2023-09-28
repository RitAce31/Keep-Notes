from django.urls import path
from . import views

urlpatterns = [
    path('/' , views.home , name='home'),
    path('api/notes' , views.getNote , name='notes'),
    path('api/delete-notes/<int:id>' , views.delNote , name='delete-note'),
    path('api/add-notes' , views.addNote , name='add-note'),
    path('api/update-notes/<int:id>' , views.updateNote , name='update-Note')
]