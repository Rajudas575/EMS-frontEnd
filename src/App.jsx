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
import EmployeeDashboard from "./component/EmployeeDashboard";
import EmployeeHome from "./component/EmployeeHome";
import EmpProfile from "./component/EmpProfile";
import AdminEdit from "./component/AdminEdit";
import EmpProfileEdit from "./component/EmpProfileEdit";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/employee_login" element={<EmployeeLogin />} />
        <Route path="/employee-dashboard/:id" element={<EmployeeDashboard />}>
          <Route index element={<EmployeeHome />} />
          <Route path="profile" element={<EmpProfile />} />
          <Route path="update_emp_profile" element={<EmpProfileEdit />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
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
