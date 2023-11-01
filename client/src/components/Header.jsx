import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import "../style/Header.css";
import Button from "@mui/material/Button";

function Header() {
  const [value, setValue] = useState(0); // You need to define value and setValue for BottomNavigation

  return (
    <div id="header">
      <div>
        <BottomNavigation
          id="searchButton"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            
            variant="outlined"
            icon={<SearchIcon />}
          />
        </BottomNavigation>
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
  );
}

export default Header; // Use PascalCase for component names, i.e., Header instead of header

