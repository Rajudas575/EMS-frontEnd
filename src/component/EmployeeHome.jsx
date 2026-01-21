import axios from "axios";
import "./style.css";
import React, { useEffect, useState } from "react";
import { getEnv } from "../Helpers/getEnv";
import { useParams } from "react-router-dom";
import SalaryChart from "./SalaryChart";

const EmployeeHome = () => {
  const [employee, setEmployee] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/employee/detail/${id}`)
      .then((result) => {
        if (result.data.status) {
          setEmployee(result.data.result);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="user-detail-bg px-3 pt-2 pb-3 border rounded shadow-sm w-25">
          <div className="text-center pb-1 text-white">
            <h4>Welcome {employee.name}</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-white">
            <h5>
              Joined On: {new Date(employee.createdAt).toLocaleDateString()}
            </h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border rounded shadow-sm w-25 user-attendance">
          <div className="text-center text-white pb-1">
            <h4>Attendance</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-white">
            <h5>
              On: {new Date().toLocaleString("en-US", { month: "long" })} Total:
              12 Days
            </h5>
            <h5></h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border rounded shadow-sm w-25 user-leave">
          <div className="text-center text-white pb-1">
            <h4>Leave Details </h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-white">
            <h5>Total 35</h5>
            <h5>Taken 10 </h5>
            <h5>Remain 25 </h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <SalaryChart />
      </div>
    </div>
  );
};

export default EmployeeHome;
