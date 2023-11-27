import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/Data">Data</Link>
        </li>
        <li className="nav-item">
          <Link to="/About">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
