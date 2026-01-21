import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEnv } from "../Helpers/getEnv";

const EmpProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/employee/detail/${id}`)
      .then((result) => {
        setEmployee(result.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(`${getEnv("VITE_API_BASE_URL")}/auth/edit_employee/${id}`, employee)
  //     .then((result) => {
  //       if (result.data.status) {
  //         toast.success("Employee updated successfully");
  //         setTimeout(() => {
  //           navigate("/dashboard/employee");
  //         }, 1000);
  //       } else {
  //         toast.error(result.data.error);
  //       }
  //     })
  //     .catch((err) => toast.error("Update failed", +err));
  // };

  return (
    <div>
      <div className="px-5 mt-3">
        <h3>Your Profile</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(employee).length > 0 ? (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
                <td>{employee.address}</td>
                <td>
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
                </td>
                <td>
                  <Link
                    to={`/employee-dashboard/${employee._id}/update_emp_profile`}
                    className="btn btn-info btn-sm me-2">
                    Edit
                  </Link>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5">No admins found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpProfile;
