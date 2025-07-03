import React, { useState } from "react";
import ArrowUp from "../../assets/arrow-up.svg?react";
import ArrowDown from "../../assets/arrow-down.svg?react";

const SubMenu = ({ label, icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item py-2">
      <button
        className="nav-link btn btn-toggle d-flex justify-content-between align-items-center w-100"
        onClick={() => setOpen(!open)}
      >
        {icon && <span className="me-2">{icon}</span>}
        {label}
        <span className="ms-auto">{open ? <ArrowUp /> : <ArrowDown />}</span>
      </button>
      {open && <ul className="nav flex-column ms-3">{children}</ul>}
    </li>
  );
};

export default SubMenu;
