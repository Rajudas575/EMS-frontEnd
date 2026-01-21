import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEnv } from "../Helpers/getEnv";


const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get(`${getEnv('VITE_API_BASE_URL')}/employee/detail/${id}`)
      .then((result) => {
        if (result.data.status) {
          setEmployee(result.data.result);
        } else {
          toast.error(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get(`${getEnv('VITE_API_BASE_URL')}/employee/logout`)
      .then((result) => {
        if (result.data.status) {
          toast.success("Logout successfully!");
          navigate("/start");
        } else {
          toast.error(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Emoployee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        {employee.image ? (
          <img
            src={employee.image}
            alt={employee.name}
            width="50"
            height="50"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          <span>No Image</span>
        )}
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
