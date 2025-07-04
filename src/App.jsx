import React from "react";
import "./App.css";
import EmployeeSidebar from "./components/layout/EmployeeSidebar.jsx";
import ManagerSidebar from "./components/layout/ManagerSidebar.jsx";
import AppRouter from "./router/AppRouter.jsx";
function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
