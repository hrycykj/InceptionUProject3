import React from "react";
import './NavBar.css'



const NavBar = () => {
  return (
    <div>
        
      <div className="container">
      <div className="logo">Rabbit Hole</div>
        <div className="header">
          <nav>
            <ul>
              
              <li>How to Play</li>
              <li>Download</li>
            </ul>
          </nav>
          <button className="btn" id="btn1">
            Log In
          </button>
          <button className="btn" id="btn2">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
