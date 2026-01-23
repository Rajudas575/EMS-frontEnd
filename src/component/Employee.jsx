import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEnv } from "../Helpers/getEnv";

const Employee = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState([]);
  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/employees`)
      .then((result) => {
        if (result.data.status) {
          setEmpData(result.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${getEnv("VITE_API_BASE_URL")}/auth/delete_employee/${id}`)
      .then((result) => {
        if (result.data.status) {
          toast.success(result.data.message);
          setTimeout(() => {
            navigate("/dashboard/employee");
          }, 1000);
        } else {
          toast.error(result.data.error);
        }
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div>
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Employee List</h3>
        </div>
        <Link to="/dashboard/add_employee" className="btn btn-info">
          Add Employee
        </Link>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>SL.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Address</th>
                <th>Category</th>
                <th>Image</th>
                <th>Set Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {empData.map((e, i) => (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.salary}</td>
                  <td>{e.address}</td>
                  <td>{e.category_id?.category || "N/A"}</td>
                  <td>
                    {e.image ? (
                      <img
                        src={e.image}
                        alt={e.name}
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
                      to={`/dashboard/set_salary/${e._id}`}
                      className="btn btn-warning btn-sm">
                      Set Salary
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/${e._id}`}
                      className="btn btn-info btn-sm me-2">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(e._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
