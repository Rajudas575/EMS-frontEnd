import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnv } from "../Helpers/getEnv";

const Start = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${getEnv("VITE_API_BASE_URL")}/verify`, {
          withCredentials: true,
        });

        if (res.data.status) {
          if (res.data.role === "admin") {
            navigate("/dashboard", { replace: true });
          } else {
            navigate(`/employee-dashboard/${res.data.id}`, {
              replace: true,
            });
          }
        } else {
          navigate("/", { replace: true });
        }
      } catch (err) {
        // 401 or any error → go to login/home
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2 className="text-center">Login As</h2>
          <div className="d-flex justify-content-between mt-5 mb-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/employee_login");
              }}>
              Employee
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                navigate("/adminlogin");
              }}>
              Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Start;
