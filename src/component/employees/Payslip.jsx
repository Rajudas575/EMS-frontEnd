import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
import { useParams } from "react-router-dom";
import { getEnv } from "../../Helpers/getEnv";

const Payslip = () => {
  const { id: userId } = useParams();
  const [payroll, setPayroll] = useState(null);

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  useEffect(() => {
    axios
      .get(
        `${getEnv("VITE_API_BASE_URL")}/employee/payroll/${userId}/${month}/${year}`,
      )
      .then((res) => setPayroll(res.data.payroll))
      .catch((err) => console.log(err));
  }, [userId, month, year]);

  if (!payroll)
    return (
      <div className="text-center text-danger mt-5">
        <h3 className="text-shadow">Payslip not generated yet 😒</h3>
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h4 className="text-center mb-3">PAYSLIP</h4>

        <p>
          <b>Name:</b> {payroll.userId.name}
        </p>
        <p>
          <b>Month:</b> {month}/{year}
        </p>

        <hr />

        <p>Basic Salary: ₹{payroll.basicSalary}</p>
        <p>HRA: ₹{payroll.hra}</p>
        <p>Allowance: ₹{payroll.allowance}</p>
        <p>Deductions: ₹{payroll.lopDeduction + payroll.professionalTax}</p>

        <hr />

        <h5 className="text-success">Net Pay: ₹{payroll.netSalary}</h5>

        <a
          href={`${getEnv("VITE_API_BASE_URL")}/employee/payslip/${month}/${year}/download`}
          className="btn btn-primary mt-3">
          Download Payslip
        </a>
      </div>
    </div>
  );
};

export default Payslip;
