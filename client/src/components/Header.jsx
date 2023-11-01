import React, { useState } from "react";
import SearchIcon from "../components/Icons/Search";
import "../style/Header.css";

function Header() {
  const [value, setValue] = useState(0); // You need to define value and setValue for BottomNavigation

  return (
    <>
      <div id="header">
        <div id="button">
          <button id="searchIcon">
            {" "}
            <SearchIcon />
          </button>
        </div>

        <div className="friendProfile">
          <div className="friends" />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <div className="friends" />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <div className="friends" />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <div className="friends" />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <div className="friends" />
          <p>Name</p>
        </div>
      </div>
    </>
  );
}

export default Header; // Use PascalCase for component names, i.e., Header instead of header
