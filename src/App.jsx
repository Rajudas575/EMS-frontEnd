import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Employee from "./component/Employee";
import Category from "./component/Category";
import Profile from "./component/Profile";
import AddCategory from "./component/AddCategory";
import AddEmployee from "./component/AddEmployee";
import EditEmployee from "./component/EditEmployee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Start from "./component/Start";
import EmployeeLogin from "./component/EmployeeLogin";
import EmployeeDetail from "./component/EmployeeDetail";
import EmployeeDashboard from "./component/employees/EmployeeDashboard";
import EmployeeHome from "./component/employees/EmployeeHome";
import EmpProfile from "./component/employees/EmpProfile";
import AdminEdit from "./component/AdminEdit";
import EmpProfileEdit from "./component/employees/EmpProfileEdit";
import MyAttendance from "./component/employees/MyAttendance";
import Payslip from "./component/employees/Payslip";
import AdminLeaves from "./component/AdminLeaves";
import AdminPayroll from "./component/AdminPayroll";
import SetSalary from "./component/SetSalary";
import MyLeaves from "./component/employees/MyLeaves";
import ApplyLeave from "./component/employees/ApplyLeave";
import AdminLeaveApproval from "./component/AdminLeaveApproval";
import LeaveBalanceCard from "./component/employees/LeaveBalanceCard";
import AssignLeave from "./component/AssignLeave";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/employee_login" element={<EmployeeLogin />} />
        <Route path="/employee-dashboard/:id" element={<EmployeeDashboard />}>
          <Route path="" element={<EmployeeHome />} />
          <Route path="profile" element={<EmpProfile />} />
          <Route path="update_emp_profile" element={<EmpProfileEdit />} />
          <Route path="my_attendance" element={<MyAttendance />} />
          <Route path="my_payslip" element={<Payslip />} />
          <Route path="view_leave" element={<MyLeaves />} />
          <Route path="leave_apply" element={<ApplyLeave />} />
          <Route path="leave_balance" element={<LeaveBalanceCard />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/leave" element={<AdminLeaves />}></Route>
          <Route path="/dashboard/payroll" element={<AdminPayroll />}></Route>
          <Route
            path="/dashboard/assign-leave/:id"
            element={<AssignLeave />}></Route>
          <Route
            path="/dashboard/leave_approval"
            element={<AdminLeaveApproval />}></Route>
          <Route
            path="/dashboard/set_salary/:userId"
            element={<SetSalary />}></Route>
          <Route
            path="/dashboard/edit_admin/:id"
            element={<AdminEdit />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
