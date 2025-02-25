import { NavLink } from "react-router-dom";

const MenuItem = ({ icon, title, isActive, isOpen, toggle, children, isHavingSubLink, to }) => {
  return (
    <li className={`menu-item ${isActive ? "active" : ""} ${isOpen ? "open" : ""}`}>
      {isHavingSubLink ? (
        <a href="javascript:void(0);" className="menu-link menu-toggle" onClick={toggle}>
          <i className={`menu-icon tf-icons bx ${icon}`}></i>
          <div>{title}</div>
        </a>
      ) : (
        <NavLink to={to} className="menu-link">
          <i className={`menu-icon tf-icons bx ${icon}`}></i>
          <div>{title}</div>
        </NavLink>
      )}
      {isOpen && isHavingSubLink && <ul className="menu-sub">{children}</ul>}
    </li>
  );
};

export default MenuItem;
