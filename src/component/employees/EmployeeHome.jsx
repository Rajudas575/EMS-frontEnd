import axios from "axios";
import "../style.css";
import React, { useEffect, useState } from "react";
import { getEnv } from "../../Helpers/getEnv";
import { Link, useParams } from "react-router-dom";
import SalaryChart from "../SalaryChart";

const EmployeeHome = () => {
  const { id: userId } = useParams();
  const [employee, setEmployee] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${getEnv("VITE_API_BASE_URL")}/employee/attendanceSummary/${userId}`,
      )
      .then((res) => {
        setAttendanceSummary(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

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
        <div className="user-detail-bg px-3 pt-2 pb-3 border rounded shadow-sm w-30">
          <div className="text-center pb-1 text-white">
            <h4>Welcome {employee.name}</h4>
          </div>
          <hr />
          <div className="d-flex flex-column justify-content-between text-white">
            <h5>
              Joined On: {new Date(employee.createdAt).toLocaleDateString()}
            </h5>
            <h5>Department: {employee.category_id?.category}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border rounded shadow-sm w-30 user-attendance">
          <div className="text-center text-white pb-1">
            <h4>Attendance</h4>
          </div>
          <hr />
          <div className="d-flex flex-column justify-content-between text-white text-center">
            <h4>
              On {new Date().toLocaleString("en-US", { month: "long" })} -{" "}
              {new Date().getFullYear()}
            </h4>
            <h5>
              Present days:
              <span className="font-weight-bold ms-2">
                {attendanceSummary?.presentDays ?? 0}
              </span>
            </h5>
            {/* <h5>Half Days: {attendanceSummary?.halfDays ?? 0}</h5> */}
            {/* <h5>Absent Days: {attendanceSummary?.absentDays ?? 0}</h5> */}
            {/* <h5>Working Days: {attendanceSummary?.workingDays ?? 0}</h5> */}
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border rounded shadow-sm w-30 user-leave">
          <div className="text-center text-white pb-1">
            <h4>Leave Details </h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-white">
            <Link
              to={"view_leave"}
              className="btn btn-light text-dark btn-sm me-2">
              Leave Status
            </Link>
            <Link
              to={"leave_balance"}
              className="btn btn-light text-dark btn-sm me-2">
              Leave Balance
            </Link>
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
