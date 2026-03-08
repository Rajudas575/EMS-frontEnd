import axios from "axios";
import { useEffect, useState } from "react";
import { getEnv } from "../Helpers/getEnv";

const AdminCalendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [holidays, setHolidays] = useState([]);
  const [weeklyOff, setWeeklyOff] = useState(["Saturday", "Sunday"]);

  const addHoliday = () => {
    setHolidays([...holidays, { date: "", name: "" }]);
  };

  const updateHoliday = (index, field, value) => {
    const updated = [...holidays];
    updated[index] = { ...updated[index], [field]: value };
    setHolidays(updated);
  };

  const saveCalendar = async () => {
    try {
      await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/auth/admin/calendar`,
        { year, holidays, weeklyOff },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      alert("Calendar saved successfully");
    } catch (error) {
      console.error("SAVE CALENDAR ERROR:", error.response || error);
      alert(error.response?.data?.message || "Error saving calendar");
    }
  };

  useEffect(() => {
    const loadCalendar = async () => {
      try {
        const res = await axios.get(
          `${getEnv("VITE_API_BASE_URL")}/auth/admin/calendar/${year}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.data) {
          setHolidays(res.data.holidays || []);
          setWeeklyOff(res.data.weeklyOff || ["Saturday", "Sunday"]);
        }
      } catch {}
    };
    loadCalendar();
  }, [year]);

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="p-3 rounded w-50 border shadow-sm">
        <h3 className="text-center">Company Calendar</h3>

        <input
          type="number"
          className="form-control mb-3"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{
            padding: "6px 10px",
            borderColor: "#f34672",
            borderRadius: "5px",
            marginRight: "5px",
            width: "50%",
          }}
        />

        <h5>Weekly Off</h5>
        {["Saturday", "Sunday"].map((d) => (
          <label key={d} className="me-3">
            <input
              type="checkbox"
              checked={weeklyOff.includes(d)}
              onChange={() =>
                setWeeklyOff(
                  weeklyOff.includes(d)
                    ? weeklyOff.filter((x) => x !== d)
                    : [...weeklyOff, d],
                )
              }
            />
          </label>
        ))}

        <h5 className="mt-3">Holidays</h5>
        {holidays.map((h, i) => (
          <div key={i}>
            <input
              type="date"
              value={h.date}
              onChange={(e) => {
                const updated = [...holidays];
                updated[i].date = e.target.value;
                setHolidays(updated);
              }}
              style={{
                padding: "6px 10px",
                borderColor: "#f34672",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            />
            <input
              placeholder="Holiday Name"
              value={h.name}
              onChange={(e) => {
                const updated = [...holidays];
                updated[i].name = e.target.value;
                setHolidays(updated);
              }}
              style={{
                padding: "6px 10px",
                borderColor: "#f34672",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            />
          </div>
        ))}

        <div>
          <button onClick={addHoliday} className="btn btn-info me-2 mt-4">
            Add Holiday
          </button>
          <button onClick={saveCalendar} className="btn btn-success mt-4">
            Save Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;
