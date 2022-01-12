import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div>
      <span>
        <h1 onClick={navigateHome}>Rabbit Hole</h1>
      </span>
    </div>
  );
};

export default NavBar;
