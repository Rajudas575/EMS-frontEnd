import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { getEnv } from "../Helpers/getEnv";
import { Link } from "react-router-dom";

const Profile = () => {
  const [adminDetails, setAdminDetails] = useState([]);

  useEffect(() => {
    adminDetail();
  }, []);

  const adminDetail = () => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/auth/admin_detail`)
      .then((result) => {
        if (result.data.status) {
          setAdminDetails(result.data.result);
        } else {
          alert(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

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
            {Object.keys(adminDetails).length > 0 ? (
              <tr key={adminDetails._id}>
                <td>{adminDetails.name}</td>
                <td>{adminDetails.email}</td>
                <td>{adminDetails.salary}</td>
                <td>{adminDetails.address}</td>
                <td>
                  {adminDetails.image ? (
                    <img
                      src={adminDetails.image}
                      alt={adminDetails.name}
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
                    to={`/dashboard/edit_admin/${adminDetails._id}`}
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

export default Profile;
