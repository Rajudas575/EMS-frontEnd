import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", salary: 20000 },
  { month: "Feb", salary: 22000 },
  { month: "Mar", salary: 25000 },
];

const SalaryChart = () => (
  <div style={{ backgroundColor: "#1688e6", padding: "20px", borderRadius: "10px" }}>
  <LineChart text={"white"} width={"100%"} height={230} data={data}>
    <XAxis dataKey="month" stroke="#ffffff"/>
    <YAxis stroke="#ffffff"/>
    <Tooltip />
    <CartesianGrid stroke="#ffffff" />
    <Line type="monotone" dataKey="salary" stroke="#f71049" />
  </LineChart>
  </div>
);

export default SalaryChart;
