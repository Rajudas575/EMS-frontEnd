import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEnv } from "../Helpers/getEnv";

const SetSalary = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [salary, setSalary] = useState({
    basic: "",
    hra: "",
    allowance: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${getEnv("VITE_API_BASE_URL")}/auth/set-salary/${userId}`,
        {
          basic: Number(salary.basic),
          hra: Number(salary.hra),
          allowance: Number(salary.allowance),
        },
      );

      alert(res.data.message);
      navigate("/dashboard/employee");
    } catch (err) {
      alert(err.response?.data?.message || "Error setting salary");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border mt-5">
        <h2 className="text-center">Set Salary Structure</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Basic Salary</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setSalary({ ...salary, basic: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>HRA</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setSalary({ ...salary, hra: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Allowance</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) =>
                setSalary({ ...salary, allowance: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary w-100">Save Salary</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetSalary;
