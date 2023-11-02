import React, { useState } from "react";
// import SearchIcon from "../components/Icons/Search";
import SearchIcon from "@mui/icons-material/Search";
import "../style/Header.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function Header() {


  const [value, setValue] = useState(0); // You need to define value and setValue for BottomNavigation
  const neon = '#EDFB60';
  const black = '#212121'
   const backBtn = {
    color: black
   }
  return (
    <>
      <div id="header">
       
        <div id="button">
          <IconButton>
            <SearchIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </div>

        {/* <div className="friendProfile">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          <p>Name</p>
        </div>
        <div className="friendProfile">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          /> */}
          <p>Name</p>
        </div>
      {/* </div> */}
    </>
  );
}

export default Header; // Use PascalCase for component names, i.e., Header instead of header
