import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEnv } from "../Helpers/getEnv";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    category_id: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    // Fetch categories
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/category`)
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));

    // Fetch employee by id
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/employee/${id}`)
      .then((result) => {
        const emp = result.data.result;

        setEmployee({
          name: emp.name || "",
          email: emp.email || "",
          address: emp.address || "",
          category_id: emp.category_id?._id || emp.category_id || "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${getEnv("VITE_API_BASE_URL")}/auth/edit_employee/${id}`, employee)
      .then((result) => {
        if (result.data.status) {
          toast.success("Employee updated successfully");
          setTimeout(() => {
            navigate("/dashboard/employee");
          }, 1000);
        } else {
          toast.error(result.data.error);
        }
      })
      .catch((err) => toast.error("Update failed", +err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              value={employee.email}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              value={employee.address}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>

            <select
              id="category"
              name="category_id"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }>
              {category.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
