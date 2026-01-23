import React, { useState } from "react";
import axios from "axios";
import { getEnv } from "../Helpers/getEnv";

const AdminPayroll = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const generatePayroll = async () => {
    try {
      const res = await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/auth/payroll/generate`,
        { month, year },
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Payroll generation failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2 className="text-center">Generate Payroll</h2>

        <div className="card p-3 mt-3 w-100">
          <div className="row">
            <div className="col-md-4">
              <label>Month</label>
              <select
                className="form-select"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label>Year</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
          </div>

          <button className="btn btn-primary mt-3" onClick={generatePayroll}>
            Generate Payroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPayroll;
