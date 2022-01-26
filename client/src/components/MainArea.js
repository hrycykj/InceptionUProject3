import React from "react";
import "./MainArea.css";
import { NavLink } from "react-router-dom";

const MainArea = () => {
  return (
    <div class="container">
      <ul>
        <li>
          <div class="bottom">Welcome 'USERNAME'</div>
          <div class="info">
            <ul>Get to know your city like never before!</ul>
            <ul>
              Play, collect, learn, explore, and create exciting scavenger hunts
              around the city.{" "}
            </ul>
            <ul>In Rabbit Hole you can.....</ul>
            <NavLink to="/host-a-hunt">
              <ul class="feature">Host a hunt</ul>
            </NavLink>
            <NavLink to="join-a-hunt">
              <ul class="feature">Join a hunt</ul>
            </NavLink>
            <NavLink to="/create-your-quest">
              <ul class="feature">Create your own Adventure!</ul>
            </NavLink>
          </div>
        </li>
      </ul>

      <li>
        <div class="begin">Play Now</div>
      </li>
      <div class="background">
        <img
          src="https://i.ibb.co/Cs44036/Wave.png"
          alt="Wave"
          border="0"
        ></img>
      </div>
    </div>
  );
};

export default MainArea;
