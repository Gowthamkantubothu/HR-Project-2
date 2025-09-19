from django.urls import path
from .views import CandidateListCreate, CandidateDetail, JobListCreate, JobDetail, ApplyJob, JobApplications

urlpatterns = [
    path('candidates/', CandidateListCreate.as_view()),
    path('candidates/<int:pk>/', CandidateDetail.as_view()),
    path('jobs/', JobListCreate.as_view()),
    path('jobs/<int:pk>/', JobDetail.as_view()),
    path('jobs/<int:job_id>/apply/', ApplyJob.as_view()),
    path('jobs/<int:job_id>/applications/', JobApplications.as_view()),
]
