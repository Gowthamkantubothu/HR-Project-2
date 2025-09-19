from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Candidate, Job, Application
from .serializers import CandidateSerializer, JobSerializer, ApplicationSerializer

# Candidate CRUD
class CandidateListCreate(generics.ListCreateAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

class CandidateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

# Job CRUD
class JobListCreate(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

# Apply for Job
class ApplyJob(APIView):
    def post(self, request, job_id):
        candidate_id = request.data.get('candidate_id')
        try:
            candidate = Candidate.objects.get(id=candidate_id)
            job = Job.objects.get(id=job_id)
            application, created = Application.objects.get_or_create(candidate=candidate, job=job)
            if not created:
                return Response({'message': 'Already applied'}, status=status.HTTP_400_BAD_REQUEST)
            serializer = ApplicationSerializer(application)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Candidate.DoesNotExist:
            return Response({'error': 'Candidate not found'}, status=status.HTTP_404_NOT_FOUND)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

# List Candidates for a Job
class JobApplications(APIView):
    def get(self, request, job_id):
        applications = Application.objects.filter(job_id=job_id)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)
