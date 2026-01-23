import axios from "axios";
import React, { useEffect, useState } from "react";
import { getEnv } from "../Helpers/getEnv";

const AdminLeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    const res = await axios.get(
      `${getEnv("VITE_API_BASE_URL")}/auth/leave/pending`,
      { withCredentials: true },
    );
    setLeaves(res.data.result);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleAction = async (leaveId, action) => {
    try {
      await axios.put(
        `${getEnv("VITE_API_BASE_URL")}/auth/leave/${action}/${leaveId}`,
        {},
        { withCredentials: true },
      );
      alert(`Leave ${action}ed`);
      fetchLeaves(); // refresh
    } catch (err) {
      alert("Action failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Leave Approval (Admin)</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Employee</th>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No pending leaves
              </td>
            </tr>
          )}

          {leaves.map((l) => (
            <tr key={l._id}>
              <td>{l.userId.name}</td>
              <td>{l.fromDate.slice(0, 10)}</td>
              <td>{l.toDate.slice(0, 10)}</td>
              <td>{l.leaveType}</td>
              <td>{l.reason}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleAction(l._id, "approve")}>
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleAction(l._id, "reject")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLeaveApproval;
