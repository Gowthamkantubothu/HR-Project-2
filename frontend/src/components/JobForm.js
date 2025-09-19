import React, { useState, useEffect } from "react";
import axios from "axios";

function JobForm({ fetchJobs, selectedJob, setSelectedJob }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [recruiterName, setRecruiterName] = useState("");

  // Populate form when editing a job
  useEffect(() => {
    if (selectedJob) {
      setTitle(selectedJob.title);
      setDescription(selectedJob.description);
      setRequiredSkills(selectedJob.required_skills);
      setRecruiterName(selectedJob.recruiter_name);
    }
  }, [selectedJob]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      description,
      required_skills: requiredSkills,
      recruiter_name: recruiterName,
    };

    try {
      if (selectedJob) {
        // Update existing job
        await axios.put(
          `http://127.0.0.1:8000/api/jobs/${selectedJob.id}/`,
          jobData
        );
        alert("Job updated successfully!");
        setSelectedJob(null); // Reset selected job after editing
      } else {
        // Create new job
        await axios.post("http://127.0.0.1:8000/api/jobs/", jobData);
        alert("Job added successfully!");
      }
      setTitle("");
      setDescription("");
      setRequiredSkills("");
      setRecruiterName("");
      fetchJobs();
    } catch (err) {
      if (err.response && err.response.data) {
        const messages = Object.entries(err.response.data)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("\n");
        alert("Error:\n" + messages);
      } else {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <div>
      <h3>{selectedJob ? "Edit Job" : "Add Job"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          placeholder="Required Skills (comma separated)"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
          required
        />
        <input
          placeholder="Recruiter Name"
          value={recruiterName}
          onChange={(e) => setRecruiterName(e.target.value)}
          required
        />
        <button type="submit">{selectedJob ? "Update Job" : "Add Job"}</button>
      </form>
    </div>
  );
}

export default JobForm;
