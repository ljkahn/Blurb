import React, { useState } from "react";
// import SearchIcon from "../components/Icons/Search";
import SearchIcon from "@mui/icons-material/Search";
import "../style/Header.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchBar from "./SearchBar/SearchBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Auth from '../utils/auth';
import { useNavigate } from "react-router-dom";

function Header() {
  navigation = useNavigate();
  const [value, setValue] = useState(0); // You need to define value and setValue for BottomNavigation
  const neon = "#EDFB60";
  const black = "#212121";
  const backBtn = {
    color: black,
  };

  const handleLogout = () => {
    Auth.logout(navigation)
  };

  //I am trying to get the login button to only show up when a user is logged in but it's not working, going to ask Justin about it. 
  const isLoggedIn = Auth.loggedIn(navigation);

  return (
    <>
      <div id="header">
        <div id="button">
          <IconButton>
            <SearchIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
        <SearchBar />
      <Grid justify="flex-end">
        { isLoggedIn && (
        <Grid  item>
          <Button id="logout" onClick={handleLogout} variant='contained'>
            Logout
          </Button>
          </Grid>
       ) }
       </Grid>
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

        {/* <p>Name</p> */}
      </div>
      {/* </div> */}
    </>
  );
}

export default Header; // Use PascalCase for component names, i.e., Header instead of header
