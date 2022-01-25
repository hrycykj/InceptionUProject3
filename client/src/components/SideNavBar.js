import React from "react";
import "./NavBar.css";

const SideNavBar = () => {
  return (
    <div>

    <h1>Welcome User</h1>
    <h3>you have XYZ amount of points</h3>


    <div>
      <div className="navbar-main">
        <ul>Select a hunt</ul>
        <ul>Scavenger hunt</ul>
        <ul>Host a hunt</ul>
        <ul>Join a hunt</ul>
        <ul>Create your own Adventure</ul>
      </div>
    </div>
    </div>
  );
};

export default SideNavBar;
