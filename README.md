# HR-Project-2(Job Posting & Application Portal)

📌 Project Overview

The Job Posting & Application Portal is a web application that allows HR recruiters to post jobs, manage candidates, and track applicants.
This system simplifies the recruitment workflow by offering:

  Candidate management with validation and duplicate checks.
  
  Job posting with full CRUD operations (Create, Read, Update, Delete).
  
  Direct applicant tracking linked to specific job postings.
  
  Navigation bar for smooth switching between modules.

This project is the second module of the HR Management System (interconnected with Project 1 – Candidate Management System).

🚀 Features
🔹 Candidates

  ->Add new candidates with details (name, email, phone number, resume link, status).
  
  ->Validation checks:

   -Phone number must be 10 digits.
  
   -Email format validation.
  
   -Duplicate prevention: Email, Phone Number, Resume Link are unique.

  ->Edit candidate details.
  
  ->Delete candidates.

  ->View candidate list in a clean formatted layout.

🔹 Jobs

  ->Add new jobs with: Title, Description, Required Skills, Recruiter Name.
  
  ->Edit existing jobs (with pre-filled form fields).
  
  ->Delete jobs.
  
  ->View all job postings.

🔹 Job Details & Applicants

  ->Displays all job postings directly within this section.
  
  ->For each job:
  
   -View applicants’ details (Name, Email, Phone, Status).
  
   -Total number of applicants is shown.
  
  ->No need to switch back to "Jobs" tab — jobs are listed here directly.

🔹 Navigation

  ->A Navbar provides easy access to:
  
   -Candidates
  
   -Jobs
  
   -Job Details & Applicants

🏗️ Tech Stack

Frontend (React.js)

  ->React 18
  
  ->Axios (for API requests)
  
  ->React Router (for navigation)

Backend (Django REST Framework)

  ->Django 5+
  
  ->Django REST Framework

  ->MySQL (Database)

📂 Project Structure

Frontend (Project2-Frontend/)
    
  src/

  ├── components/

  │    ├── CandidateForm.js

  │    ├── CandidateList.js

  │    ├── JobForm.js

  │    ├── JobList.js

  │    ├── JobDetails.js

  │    └── Navbar.js

  ├── App.js

  └── index.js

Backend (Project2-Backend/)

 project2_backend/

 ├── api/

 │    ├── models.py

 │    ├── serializers.py

 │    ├── views.py

 │    ├── urls.py

 ├── project2_backend/

 │    ├── settings.py

 │    ├── urls.py

 ├── manage.py

⚙️ Installation & Setup

1️⃣ Backend (Django + MySQL)

    # Navigate to backend folder
    cd Project2-Backend
    
    # Create virtual environment
    python -m venv venv
    venv\Scripts\activate   # On Windows
    
    # Install dependencies
    pip install django djangorestframework mysqlclient
    
    # Make migrations
    python manage.py makemigrations
    python manage.py migrate
    
    # Run server
    python manage.py runserver
    
  The API will be available at:
  
👉 http://127.0.0.1:8000/api/

2️⃣ Frontend (React.js)

    # Navigate to frontend folder
    cd Project2-Frontend
    
    # Install dependencies
    npm install
    
    # Start React app
    npm start

  The frontend will be available at:
  
👉 http://localhost:3000/

📌 API Endpoints

Candidates

  ->GET /api/candidates/ → List all candidates
  
  ->POST /api/candidates/ → Add new candidate
  
  ->PUT /api/candidates/<id>/ → Update candidate
  
  ->DELETE /api/candidates/<id>/ → Delete candidate

Jobs

  ->GET /api/jobs/ → List all jobs
  
  ->POST /api/jobs/ → Add new job
  
  ->PUT /api/jobs/<id>/ → Update job
  
  ->DELETE /api/jobs/<id>/ → Delete job

Applicants

  ->GET /api/jobs/<job_id>/applicants/ → Get all applicants for a job
  

✅ Example UI Screens

Candidates List

    Candidates
    ---------
    Name: Gowtham
    Email: gowtham@gmail.com
    Phone: 9876543210
    Status: Applied
Jobs List

    Jobs
    ---------
    Title: Frontend Developer
    Description: React.js Developer with 2 years exp.
    Skills: React, JavaScript
    Recruiter: HR Team

Job Details & Applicants

    Job Details & Applicants
    ------------------------
    Applicants for Job ID: 1
    sirija
    Email: siri@gmail.com
    Phone: 8639497329
    Status: Applied
    
    gowtham
    Email: gani@gmail.com
    Phone: 9390392260
    Status: Applied
    
    ravi
    Email: ravi@gmail.com
    Phone: 9000794113
    Status: Applied
    
    Total Applicants: 3


