import React, { useState, useEffect } from "react";
import axios from "axios";

function CandidateForm({ fetchCandidates, selectedCandidate, setSelectedCandidate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [current_status, setCurrentStatus] = useState("");
  const [resume_link, setResumeLink] = useState("");

  // Duplicate warnings
  const [emailWarning, setEmailWarning] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");
  const [resumeWarning, setResumeWarning] = useState("");

  useEffect(() => {
    if (selectedCandidate) {
      setName(selectedCandidate.name);
      setEmail(selectedCandidate.email);
      setPhoneNumber(selectedCandidate.phone_number);
      setCurrentStatus(selectedCandidate.current_status);
      setResumeLink(selectedCandidate.resume_link);
    } else {
      setName(""); setEmail(""); setPhoneNumber(""); setCurrentStatus(""); setResumeLink("");
    }
    setEmailWarning(""); setPhoneWarning(""); setResumeWarning("");
  }, [selectedCandidate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Real-time duplicate check
  const checkDuplicate = async (field, value) => {
    if (!value) return;

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/candidates/`);
      const existing = res.data;

      if (field === "email") {
        setEmailWarning(existing.some(c => c.email === value && (!selectedCandidate || c.id !== selectedCandidate.id)) ? "Email already exists!" : "");
      }
      if (field === "phone_number") {
        setPhoneWarning(existing.some(c => c.phone_number === value && (!selectedCandidate || c.id !== selectedCandidate.id)) ? "Phone number already exists!" : "");
      }
      if (field === "resume_link") {
        setResumeWarning(existing.some(c => c.resume_link === value && (!selectedCandidate || c.id !== selectedCandidate.id)) ? "Resume link already exists!" : "");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(phone_number)) {
      alert("Phone number must be 10 digits.");
      return;
    }
    if (emailWarning || phoneWarning || resumeWarning) {
      alert("Please resolve duplicate warnings before submitting.");
      return;
    }

    try {
      if (selectedCandidate) {
        await axios.put(`http://127.0.0.1:8000/api/candidates/${selectedCandidate.id}/`, {
          name, email, phone_number, current_status, resume_link
        });
        setSelectedCandidate(null);
      } else {
        await axios.post(`http://127.0.0.1:8000/api/candidates/`, {
          name, email, phone_number, current_status, resume_link
        });
      }
      fetchCandidates();
      setName(""); setEmail(""); setPhoneNumber(""); setCurrentStatus(""); setResumeLink("");
    } catch (err) {
      alert("Error submitting candidate: " + err.message);
    }
  };

  return (
    <div>
      <h3>{selectedCandidate ? "Edit Candidate" : "Add Candidate"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => checkDuplicate("email", email)}
          required
        />
        {emailWarning && <p style={{ color: "red", fontSize: "12px" }}>{emailWarning}</p>}

        <input
          placeholder="Phone (10 digits)"
          value={phone_number}
          onChange={e => setPhoneNumber(e.target.value)}
          onBlur={() => checkDuplicate("phone_number", phone_number)}
          required
        />
        {phoneWarning && <p style={{ color: "red", fontSize: "12px" }}>{phoneWarning}</p>}

        <input
          placeholder="Current Status"
          value={current_status}
          onChange={e => setCurrentStatus(e.target.value)}
          required
        />

        <input
          placeholder="Resume Link"
          value={resume_link}
          onChange={e => setResumeLink(e.target.value)}
          onBlur={() => checkDuplicate("resume_link", resume_link)}
          required
        />
        {resumeWarning && <p style={{ color: "red", fontSize: "12px" }}>{resumeWarning}</p>}

        <button type="submit">{selectedCandidate ? "Update Candidate" : "Add Candidate"}</button>
      </form>
    </div>
  );
}

export default CandidateForm;
