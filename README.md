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

