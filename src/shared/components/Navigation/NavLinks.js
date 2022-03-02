import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            Stores
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/profile/${auth.userId}`}>Profile</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/favorites/${auth.userId}`}>Favorites</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
