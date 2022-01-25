import React from "react";
import "./Footer.css";
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
		<div class="foot"> 
			<nav>
				<li>Contact</li>
				<li><NavLink to="/about">About</NavLink></li>
				<li>Partner with us</li>
				<li>FAQ</li>
			</nav>
		</div>
  </footer>
  );
};

export default Footer

