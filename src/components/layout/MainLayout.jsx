import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar.jsx";
import ManagerSidebar from "./ManagerSidebar.jsx";
import SeniorSidebar from "./SeniorSidebar.jsx";
import "../../stylesheets/MainLayout.css";
import { useAuth } from "../../context/AuthContext.jsx";

const MainLayout = ({ children }) => {
  const { role } = useAuth();

  return (
    <div className="app-container">
      {role === "SENIOR_MANAGER" ? (
        <SeniorSidebar />
      ) : role === "MANAGER" ? (
        <ManagerSidebar />
      ) : (
        <EmployeeSidebar />
      )}
      <div className="main-content-wrapper">
        <div className="content-area p-4">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
