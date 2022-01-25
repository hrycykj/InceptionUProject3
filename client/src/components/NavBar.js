import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'



const NavBar = () => {
  return (
    <header>
    <div class="inner">
<NavLink to="/">
    <div class="logo">
        <div>
            
            <img src="https://i.ibb.co/6rmpGgR/Logo-trail.png" alt="Logo-trail" border="0"></img>
            
        </div>
    </div>
    </NavLink>

    <nav>
      
        <li><span class="under"> Player</span></li>
        <li><span class="under"> Download</span></li>
        <li><span class="button"> Login</span></li>
        <li><span class="button"> Sign Up </span></li>
       
    </nav>
  </div>
  </header>
  );
};

export default NavBar;

