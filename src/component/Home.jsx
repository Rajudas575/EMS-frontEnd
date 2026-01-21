import axios from "axios";
import React, { useEffect, useState } from "react";
import { getEnv } from "../Helpers/getEnv";
import MonthlyAnalytics from "./AdminBarChart";

const Home = () => {
  const [adminTotal, setadminTotal] = useState();
  const [employeeTotal, setemployeeTotal] = useState();
  const [salaryTotal, setsalaryTotal] = useState();

  useEffect(() => {
    adminCount();
    employeeCount();
    totalSalary();
  }, []);

  const adminCount = () => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/admin_count`)
      .then((result) => {
        if (result.data.status) {
          setadminTotal(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const employeeCount = () => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/employee_count`)
      .then((result) => {
        if (result.data.status) {
          setemployeeTotal(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const totalSalary = () => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/totalSalary`)
      .then((result) => {
        if (result.data.status) {
          setsalaryTotal(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

 
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border rounded shadow-sm w-25 admin-count">
          <div className="text-center text-white pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-white">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border rounded shadow-sm w-25 admin-emp">
          <div className="text-center text-white pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-white">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border rounded text-white shadow-sm w-25 admin-salary">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>&#8377; {salaryTotal}</h5>
          </div>
        </div>
      </div>
       <div className="mt-4 px-5 pt-3 h-30">
        <MonthlyAnalytics />
      </div>
    </div>
  );
};

export default Home;
