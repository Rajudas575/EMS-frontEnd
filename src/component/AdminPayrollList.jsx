import axios from "axios";
import { useEffect, useState } from "react";
import { getEnv } from "../Helpers/getEnv";

const AdminPayrollList = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${getEnv("VITE_API_BASE_URL")}/auth/payroll`,
        {
          params: { month, year },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setPayrolls(res.data);
    } catch (error) {
      alert("Failed to load payroll list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, [month, year]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">Payroll List</h3>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Month</label>
          <select
            className="form-select"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("en-US", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>Employee</th>
              <th>Payable Days</th>
              <th>Gross Salary</th>
              <th>LOP Deduction</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : payrolls.length === 0 ? (
              <tr>
                <td colSpan="7">No payroll found</td>
              </tr>
            ) : (
              payrolls.map((p) => (
                <tr key={p._id}>
                  <td>{p.userId?.name}</td>
                  <td>{p.payableDays}</td>
                  <td>₹{p.grossSalary}</td>
                  <td className="text-danger">
                    ₹{p.lopDeduction}
                  </td>
                  <td className="fw-bold">₹{p.netSalary}</td>
                  <td>
                    {p.isLocked ? (
                      <span className="badge bg-danger">Locked</span>
                    ) : (
                      <span className="badge bg-success">Generated</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      View Payslip
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayrollList;
