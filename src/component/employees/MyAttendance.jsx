import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEnv } from "../../Helpers/getEnv";

const MyAttendance = () => {
  const { id: userId } = useParams();
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    axios
      .get(`${getEnv("VITE_API_BASE_URL")}/employee/getAtendanc/${userId}`)
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const checkIn = async () => {
    try {
      const res = await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/employee/checkin/${userId}`,
      );
      setAttendance(res.data.attendance);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const checkOut = async () => {
    try {
      const res = await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/employee/checkout/${userId}`,
      );
      setAttendance(res.data.attendance);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="px-5 mt-3">
      <h2>My Attendance</h2>
      <div className="mb-3">
        <button
          className="btn btn-success me-2"
          onClick={checkIn}
          disabled={!!attendance?.checkIn}>
          Check In
        </button>
        <button
          className="btn btn-danger"
          onClick={checkOut}
          disabled={!attendance?.checkIn || !!attendance?.checkOut}>
          Check Out
        </button>
      </div>

      {attendance && (
        <div className="card mx-auto shadow-sm bg-light">
          <div className="card-body">
            <div className="table-responsive">
              <table className="w-100 table table-light table-borderless">
                <thead className="bg-gray-100 text-center">
                  <tr>
                    <th className="py-2 px-4 border-b">DATE</th>
                    <th className="py-2 px-4 border-b">CLOCK IN</th>
                    <th className="py-2 px-4 border-b">CLOCK OUT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={attendance._id} className="text-center">
                    <td className="py-2 px-4 border-b">{attendance.date}</td>
                    <td className="py-2 px-4 border-b">{attendance.checkIn}</td>
                    <td className="py-2 px-4 border-b">
                      {attendance.checkOut}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAttendance;
