import React from "react";
import "./Footer.css";
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
		<div class="foot"> 
			<nav>
				<li><NavLink to="/contact">Contact</NavLink></li>
				<li><NavLink to="/about">About</NavLink></li>
				<li><NavLink to="/partner-with-us">Partner With Us</NavLink></li>
				<li><NavLink to="/faq">FAQ</NavLink></li>
			</nav>
		</div>
  </footer>
  );
};

export default Footer

