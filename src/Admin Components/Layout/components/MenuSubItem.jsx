import { NavLink } from "react-router-dom";

const MenuSubItem = ({ to, title }) => {
    return (
      <NavLink activeclassname="active" className="menu-item" to={to}>
        <a href="javascript:void(0);" className="menu-link">
          <div>{title}</div>
        </a>
      </NavLink>
    );
  };
  
  export default MenuSubItem;
  