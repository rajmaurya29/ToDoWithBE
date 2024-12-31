from django.urls import path
from .views import *

urlpatterns = [
    path('task-list/', TaskList.as_view()),
    path('task-detail/<int:pk>/', TaskDetail.as_view()),
    path('task-create/', TaskCreate.as_view()),
    path('task-update/<int:pk>/', TaskUpdate.as_view()),
    path('task-delete/<int:pk>/', TaskDelete.as_view()),


]
