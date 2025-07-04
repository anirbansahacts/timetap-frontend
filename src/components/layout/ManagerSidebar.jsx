import React from "react";
import NavItem from "./NavItem";
import SubMenu from "./SubMenu";
import "../../stylesheets/Sidebar.css";
import Logo from "../../assets/logo.svg?react";
import { useAuth } from "../../context/AuthContext";

const ManagerSidebar = () => {
  const { employeeId } = useAuth();

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
          <SubMenu label="Employee Management">
            <NavItem label="Add Employee" link="/employee/add" />
            <NavItem label="View Team" link="/employee/view" />
          </SubMenu>
          <NavItem label="Leave Management" link="/leave-manager" />
          <SubMenu label="Shift Management">
            <NavItem label="Shift Details" link="/shift/details" />
            <NavItem label="Shift Assignment" link="/shift/assignment" />
            <NavItem label="Shift Swap Requests" link="/shift/requests" />
          </SubMenu>
          <NavItem label="Report" link="/report" />
          <NavItem label="Profile" link={`/employees/${employeeId}`} />
          <NavItem label="Logout" link="/login" />
        </ul>
      </div>
    </div>
  );
};

export default ManagerSidebar;
