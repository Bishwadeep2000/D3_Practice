import React from "react";
import StarBreakCoffee from "./StarBreakCoffee";
import StarBreakCoffeeNavbar from "./StarBreakCoffeeNavbar";
import "../style/styleStarBreakCoffee.css";

const StarBreakCoffeeMain = () => {
  return (
    <div>
      <StarBreakCoffeeNavbar />
      <StarBreakCoffee />
    </div>
  );
};

export default StarBreakCoffeeMain;
