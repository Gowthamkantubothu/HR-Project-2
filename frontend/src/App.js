import React, { useState, useEffect } from "react";
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import axios from "axios";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // For editing jobs
  const [appliedCandidates, setAppliedCandidates] = useState([]);
  const [activeTab, setActiveTab] = useState("candidates"); // Navbar active tab

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/candidates/");
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err.message);
    }
  };

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err.message);
    }
  };

  // Fetch applied candidates for selected job
  const fetchAppliedCandidates = async (jobId) => {
    try {
      if (!jobId) {
        setAppliedCandidates([]);
        return;
      }
      const res = await axios.get(
        `http://127.0.0.1:8000/api/jobs/${jobId}/applications/`
      );
      setAppliedCandidates(res.data);
    } catch (err) {
      console.error("Error fetching applied candidates:", err.message);
    }
  };

  // Update applied candidates whenever selectedJobId changes
  useEffect(() => {
    fetchAppliedCandidates(selectedJobId);
  }, [selectedJobId]);

  // Initial load
  useEffect(() => {
    fetchCandidates();
    fetchJobs();
  }, []);

  return (
    <div className="App">
      <h1>Job Portal</h1>

      {/* Navbar */}
      <div className="navbar">
        <button
          className={activeTab === "candidates" ? "active-tab" : ""}
          onClick={() => setActiveTab("candidates")}
        >
          Candidates
        </button>
        <button
          className={activeTab === "jobs" ? "active-tab" : ""}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs
        </button>
        <button
          className={activeTab === "jobDetails" ? "active-tab" : ""}
          onClick={() => setActiveTab("jobDetails")}
        >
          Job Details & Applicants
        </button>
      </div>

      {/* Conditional Content */}
      <div className="tab-content">
        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <div className="card">
            <h2>Candidates</h2>
            <CandidateForm
              fetchCandidates={fetchCandidates}
              selectedCandidate={selectedCandidate}
              setSelectedCandidate={setSelectedCandidate}
            />
            <CandidateList
              candidates={candidates}
              fetchCandidates={fetchCandidates}
              setSelectedCandidate={setSelectedCandidate}
              selectedJobId={selectedJobId}
              appliedCandidates={appliedCandidates}
            />
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="card">
            <h2>Jobs</h2>
            <JobForm
              fetchJobs={fetchJobs}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
            />
            <JobList
              jobs={jobs}
              onSelectJob={setSelectedJobId}
              setSelectedJob={setSelectedJob}
              fetchJobs={fetchJobs}
            />
          </div>
        )}

        {/* Job Details & Applicants Tab */}
        {activeTab === "jobDetails" && (
          <div className="card">
            <h2>Job Details & Applicants</h2>
            {selectedJobId ? (
              <JobDetails
                jobId={selectedJobId}
                candidates={candidates}
                fetchCandidates={fetchCandidates}
                appliedCandidates={appliedCandidates}
                setAppliedCandidates={setAppliedCandidates}
              />
            ) : jobs.length > 0 ? (
              <>
                <p>Please select a job below to view details and applicants:</p>
                {jobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    style={{
                      display: "block",
                      margin: "5px 0",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    {job.title}
                  </button>
                ))}
              </>
            ) : (
              <p>No jobs available. Add jobs first.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
