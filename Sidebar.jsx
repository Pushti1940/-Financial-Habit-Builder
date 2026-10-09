import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "▦",
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: "↕",
    },
    {
      name: "Financial Habits",
      path: "/financial-habits",
      icon: "✓",
    },
    {
      name: "Savings Goals",
      path: "/savings-goals",
      icon: "◎",
    },
    {
      name: "Investments",
      path: "/investments",
      icon: "↗",
    },
    {
      name: "Wealth Analytics",
      path: "/wealth-analytics",
      icon: "▥",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "▤",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-symbol">
          F
        </div>

        <div>
          <h2>Finova</h2>
          <span>Financial Wellness</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-heading">
          MAIN MENU
        </p>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          <span className="sidebar-icon">
            ◯
          </span>
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="sidebar-link"
        >
          <span className="sidebar-icon">
            ⚙
          </span>
          <span>Settings</span>
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;