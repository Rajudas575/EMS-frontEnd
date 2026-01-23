import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getEnv } from "../../Helpers/getEnv";
import { toast } from "react-toastify";

const ApplyLeave = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "PL",
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${getEnv("VITE_API_BASE_URL")}/employee/apply-leave`, {
        ...form,
        userId,
      });
      navigate("../view_leave");
      toast.success("Leave applied successfully");
      setForm({ fromDate: "", toDate: "", leaveType: "PL", reason: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error applying leave");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h4>Apply Leave</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>From Date</label>
            <input
              type="date"
              className="form-control"
              value={form.fromDate}
              onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label>To Date</label>
            <input
              type="date"
              className="form-control"
              value={form.toDate}
              onChange={(e) => setForm({ ...form, toDate: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label>Leave Type</label>
            <select
              className="form-select"
              value={form.leaveType}
              onChange={(e) => setForm({ ...form, leaveType: e.target.value })}>
              <option value="PL">Paid Leave</option>
              <option value="SL">Sick Leave</option>
              <option value="LOP">Loss of Pay</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Reason</label>
            <textarea
              className="form-control"
              rows="3"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
          </div>

          <button className="btn btn-primary w-100">Submit Leave</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
