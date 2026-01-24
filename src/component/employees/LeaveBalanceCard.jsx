import axios from "axios";
import React, { useEffect, useState } from "react";
import { getEnv } from "../../Helpers/getEnv";
import { useParams } from "react-router-dom";

const LeaveBalanceCard = () => {
  const { id: userId } = useParams();
  const currentYear = new Date().getFullYear();

  const [balance, setBalance] = useState({
    PL: 0,
    SL: 0,
  });

  useEffect(() => {
    axios
      .get(
        `${getEnv("VITE_API_BASE_URL")}/employee/leave/balance/${userId}/${currentYear}`,
        { withCredentials: true },
      )
      .then((res) => setBalance(res.data.result))
      .catch((err)=>alert(err.response?.data?.message || "Leave apply failed"));
  }, [userId, currentYear]);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="card shadow-sm w-50">
        <div className="card-body">
          <h5 className="card-title">Leave Balance ({currentYear})</h5>

          <p className="mb-1">
            Paid Leave (PL): <strong>{balance.PL}</strong>
          </p>
          <p className="mb-1">
            Sick Leave (SL): <strong>{balance.SL}</strong>
          </p>
          <p className="mb-0">
            Loss of Pay (LOP): <strong>Unlimited</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalanceCard;
