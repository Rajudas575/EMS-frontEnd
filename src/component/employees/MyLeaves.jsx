import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getEnv } from "../../Helpers/getEnv";

const MyLeaves = () => {
  const { id: userId } = useParams();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/employee/leaves/${userId}`)
      .then((res) => setLeaves(res.data.result))
      .catch(() => alert("Error fetching leaves"));
  }, []);

  return (
    <div className="container mt-4">
      <h4>My Leave Requests</h4>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}>
              <td>{l.fromDate?.slice(0, 10)}</td>
              <td>{l.toDate?.slice(0, 10)}</td>
              <td>{l.leaveType}</td>
              <td>
                <span
                  className={`badge ${
                    l.status === "Approved"
                      ? "bg-success"
                      : l.status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}
                >
                  {l.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaves;
