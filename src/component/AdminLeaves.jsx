import axios from "axios";
import React, { useEffect, useState } from "react";
import { getEnv } from "../Helpers/getEnv";

const AdminLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/leaves`)
      .then((res) => setLeaves(res.data));
  }, []);

  const approveLeave = (id, leaveType) => {
    axios.patch(`${getEnv("VITE_API_BASE_URL")}/auth/leave/${id}/approve`, {
      leaveType,
    });
  };

  const rejectLeave = (id) => {
    axios.patch(`${getEnv("VITE_API_BASE_URL")}/auth/leave/${id}/reject`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-100 border mt-5">
        <h3 className="text-center">Manage Leave</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.userId.name}</td>
                <td>
                  {leave.fromDate} → {leave.toDate}
                </td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.status === "Pending" && (
                    <>
                      <button onClick={() => approveLeave(leave._id, "PL")}>
                        Approve (PL)
                      </button>
                      <button onClick={() => approveLeave(leave._id, "LOP")}>
                        Approve (LOP)
                      </button>
                      <button onClick={() => rejectLeave(leave._id)}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaves;
