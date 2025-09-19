import React from "react";
import axios from "axios";

function CandidateList({ candidates, fetchCandidates, setSelectedCandidate, selectedJobId, appliedCandidates }) {
  const isApplied = (candidateId) => {
    return appliedCandidates?.some(c => c.id === candidateId);
  };

  return (
    <div>
      <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Candidates</h3>
      {candidates.length === 0 ? (
        <p>No candidates added yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {candidates.map((c) => (
            <li key={c.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <strong style={{ fontSize: '16px' }}>{c.name}</strong>
              <p><strong>Email:</strong> {c.email}</p>
              <p><strong>Phone:</strong> {c.phone_number}</p>
              <p><strong>Status:</strong> {selectedJobId ? (isApplied(c.id) ? "Applied" : "Not Applied") : c.current_status}</p>
              <p><strong>Resume:</strong> <a href={c.resume_link} target="_blank" rel="noopener noreferrer">View</a></p>
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => setSelectedCandidate(c)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this candidate?")) {
                      try {
                        await axios.delete(`http://127.0.0.1:8000/api/candidates/${c.id}/`);
                        alert("Candidate deleted successfully!");
                        fetchCandidates();
                      } catch (err) {
                        alert("Error deleting candidate: " + err.message);
                      }
                    }
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CandidateList;
