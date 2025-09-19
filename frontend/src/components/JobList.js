import React from "react";
import axios from "axios";

function JobList({ jobs, onSelectJob, setSelectedJob, fetchJobs }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/`);
        alert("Job deleted successfully!");
        fetchJobs();
      } catch (err) {
        alert("Error deleting job: " + err.message);
      }
    }
  };

  return (
    <div>
      <h3>Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {jobs.map((job) => (
            <li
              key={job.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>{job.title}</strong>
              <p>JD: {job.description}</p>
              <p>Skills: {job.required_skills}</p>
              <p>Recruiter: {job.recruiter_name}</p>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => setSelectedJob(job)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#f39c12",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#e74c3c",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => onSelectJob(job.id)}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#3498db",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  View Applicants
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;
