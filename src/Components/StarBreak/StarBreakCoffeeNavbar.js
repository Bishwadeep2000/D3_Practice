import React from "react";
import logo from "../img/logo.png";

const StarBreakCoffeeNavbar = () => {
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

export default StarBreakCoffeeNavbar;
