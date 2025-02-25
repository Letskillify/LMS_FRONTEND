import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getCommonCredentials } from "../../GlobalHelper/CommonCredentials";
import MenuItem from "./components/MenuItem";
import MenuSubItem from "./components/MenuSubItem";
import menuData from "./menuData";

function SideDrawer() {
  const location = useLocation();
  const { SidebarOpen } = getCommonCredentials();
  const [openToggle, setOpenToggle] = useState(null);

  const toggleMenu = (key) => {
    setOpenToggle((prevKey) => (prevKey === key ? null : key));
  };

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme d-xl-block"
      style={{
        overflowY: "scroll",
        height: "100vh",
        width: "auto",
        scrollbarWidth: "thin",
        transform: SidebarOpen ? "none" : "",
      }}
    >
      <div className="bg-themprimary">
        <ul className="menu-inner">
          <div className="d-flex justify-content-center align-items-center mx-auto mt-3">
            <Link to={"/"} className="">
              <h3 className="fw-bold border text-center rounded p-3 text-white">
                School Logo
                <h6 className="mb-0 fw-bold border text-center rounded-sm mt-2 p-1 text-white">
                  Admin Dashboard
                </h6>
              </h3>
            </Link>
          </div>

          <NavLink
            className="menu-item border-top"
            activeclassname="active"
            to="/"
          >
            <Link to="/" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div>Overview</div>
            </Link>
          </NavLink>

          {menuData?.map((menu) => (
            <MenuItem
              key={menu.toggleKey || menu.to}
              icon={menu.icon}
              title={menu.title}
              to={menu.to || "#"}
              isHavingSubLink={!!menu?.routes?.length}
              isActive={menu?.routes?.some(
                (route) => route.to === location.pathname
              )}
              isOpen={openToggle === menu.toggleKey}
              toggle={
                menu?.routes ? () => toggleMenu(menu.toggleKey) : undefined
              }
            >
              {menu?.routes?.map((route) => (
                <MenuSubItem key={route.to} to={route.to} title={route.title} />
              ))}
            </MenuItem>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideDrawer;
