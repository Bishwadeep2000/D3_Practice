import React from "react";
import logo from "../img/logo.png";
import "../style/styleStarBreakCoffee.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand">
            <img id="logo" src={logo} alt="logo" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
