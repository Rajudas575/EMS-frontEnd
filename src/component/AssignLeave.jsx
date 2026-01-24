import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEnv } from "../Helpers/getEnv";

const AssignLeave = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    PL: "",
    SL: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/auth/leave/assign`,
        {
          userId,
          year: form.year,
          PL: form.PL,
          SL: form.SL,
        },
        { withCredentials: true },
      );

      alert("Leave assigned successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error assigning leave");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="container mt-4 w-50">
        <h3>Assign Leave</h3>

        <form className="card p-3" onSubmit={handleSubmit}>
          <label>Year</label>
          <input
            type="number"
            className="form-control"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />

          <label className="mt-2">Paid Leave (PL)</label>
          <input
            type="number"
            className="form-control"
            value={form.PL}
            onChange={(e) => setForm({ ...form, PL: e.target.value })}
          />

          <label className="mt-2">Sick Leave (SL)</label>
          <input
            type="number"
            className="form-control"
            value={form.SL}
            onChange={(e) => setForm({ ...form, SL: e.target.value })}
          />

          <button className="btn btn-primary mt-3">Assign Leave</button>
        </form>
      </div>
    </div>
  );
};

export default AssignLeave;
