import React, { useState, useEffect } from "react";
import axios from "axios";

function JobDetails({ jobId, candidates, fetchCandidates }) {
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  // Fetch applied candidates for this job
  const fetchAppliedCandidates = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/jobs/${jobId}/applications/`);
      setAppliedCandidates(res.data); // Should be array of candidate IDs or objects
    } catch (err) {
      console.error("Error fetching applied candidates:", err.message);
    }
  };

  useEffect(() => {
    if (jobId) fetchAppliedCandidates();
  }, [jobId]);

  // Handle Apply action
  const handleApply = async (candidateId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/jobs/${jobId}/apply/`, { candidate_id: candidateId });
      alert("Applied successfully!");
      fetchAppliedCandidates();
      fetchCandidates(); // Refresh candidate list
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Error applying: " + err.message);
      }
    }
  };

  // Check if candidate has applied
  const isApplied = (candidateId) => {
    return appliedCandidates.some(c => c.id === candidateId);
  };

  return (
    <div>
      <h3>Applicants for Job ID: {jobId}</h3>
      {candidates.length === 0 ? (
        <p>No candidates available.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {candidates.map(c => (
            <li key={c.id} style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginBottom: '10px', backgroundColor: '#fafafa' }}>
              <strong>{c.name}</strong> <br />
              Email: {c.email} <br />
              Phone: {c.phone_number} <br />
              Status: {isApplied(c.id) ? "Applied" : "Not Applied"} <br />
              {!isApplied(c.id) && (
                <button 
                  onClick={() => handleApply(c.id)}
                  style={{ marginTop: '5px', padding: '5px 10px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Apply
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <p>Total Applicants: {appliedCandidates.length}</p>
    </div>
  );
}

export default JobDetails;
