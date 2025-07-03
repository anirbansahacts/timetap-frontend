import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ label, icon, link = "#" }) => (
  <li className="nav-item py-2">
    <NavLink
      to={link}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center ${
          isActive ? "active-nav-link" : ""
        }`
      }
    >
      {icon && <span className="me-2">{icon}</span>}
      {label}
    </NavLink>
  </li>
);

export default NavItem;
