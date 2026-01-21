import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEnv } from "../Helpers/getEnv";
import { toast } from "react-toastify";

const EmpProfileEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    // Fetch employee by id
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/employee/detail/${id}`)
      .then((result) => {
        setEmployee(result.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("address", employee.address);

    if (employee.image instanceof File) {
      formData.append("image", employee.image);
    }

    axios
      .put(
        `${getEnv("VITE_API_BASE_URL")}/employee/update_emp_profile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((result) => {
        if (result.data.status) {
          toast.success(result.data.message);
          setTimeout(() => {
            navigate("../profile");
          }, 800);
        } else {
          toast.error(result.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Update failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Your Profile</h3>
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
          <div className="col-12 mb-3 mt-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 2 * 1024 * 1024) {
                  alert("Image must be less than 5MB");
                  return;
                }
                setEmployee({ ...employee, image: file });
              }}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"></span>
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpProfileEdit;
