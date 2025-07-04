import React from "react";
import NavItem from "./NavItem";
import SubMenu from "./SubMenu";
import "../../stylesheets/Sidebar.css";
import Logo from "../../assets/logo.svg?react";
// import { useAuth } from "../../context/AuthContext";

const EmployeeSidebar = () => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const employeeId = decodedToken.employeeId;

  return (
    <div
      className="d-flex flex-column position-fixed top-0 start-0 vh-100 p-3 w-25"
      style={{
        backgroundColor: "#222C4C",
        zIndex: 1000,
      }}
    >
      <div
        className="fw-semibold mb-4 text-light text-start ml ms-2 flex-row d-flex
      align-items-center fs-2"
      >
        <Logo className="me-3 ms-2" />
        TimeTap <span className="text-primary fw-bold"> .</span>
      </div>
      <div className="flex-grow-1 overflow-y-auto sidebar-scrollable-content">
        <ul className="nav nav-pills flex-column">
          <NavItem label="Dashboard" link="/dashboard" />
          <NavItem label="Attendance" link="/attendance" />
          <SubMenu label="Leave">
            <NavItem label="Apply Leave" link="/leave/apply" />
            <NavItem label="Leave Balance" link="/leave/balance" />
            <NavItem label="Leave History" link="/leave/history" />
          </SubMenu>
          <NavItem label="Shift" link="/shift" />
          <NavItem label="Report" link="/report" />
          <NavItem label="Profile" link={`/employees/${employeeId}`} />
          <NavItem label="Logout" link="/login" />
        </ul>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
