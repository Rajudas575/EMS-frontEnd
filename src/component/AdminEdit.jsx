import axios from "axios";
import { getEnv } from "../Helpers/getEnv";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/admin_detail`)
      .then((result) => {
        const ad = result.data.result;

        setAdmin({
          name: ad.name || "",
          email: ad.email || "",
          salary: ad.salary || "",
          address: ad.address || "",
          image: ad.image || "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", admin.name);
    formData.append("email", admin.email);
    formData.append("salary", admin.salary);
    formData.append("address", admin.address);

    // ✅ image comes from admin.image
    if (admin.image instanceof File) {
      formData.append("image", admin.image);
    }

    axios
      .put(`${getEnv("VITE_API_BASE_URL")}/auth/edit_admin/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data.status) {
          toast.success(result.data.message);
          navigate("/dashboard/profile");
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
    <div>
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
                value={admin.name}
                onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
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
                value={admin.email}
                autoComplete="off"
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
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
                value={admin.address}
                autoComplete="off"
                onChange={(e) =>
                  setAdmin({ ...admin, address: e.target.value })
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
                  setAdmin({ ...admin, image: file });
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
    </div>
  );
};

export default AdminEdit;
