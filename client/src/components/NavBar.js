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
      
        <li><NavLink to="/player"><span class="under"> Player</span></NavLink></li>
        <li><NavLink to="/download"><span class="under"> Download</span></NavLink></li>
        <li><NavLink to="/login"><span class="button"> Login</span></NavLink></li>
        <li><NavLink to="/sign-up"><span class="button"> Sign Up </span></NavLink></li>
       
    </nav>
  </div>
  </header>
  );
};

export default NavBar;

<NavLink to="/faq">FAQ</NavLink>