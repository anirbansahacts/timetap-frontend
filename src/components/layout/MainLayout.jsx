import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import "../../stylesheets/MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
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
