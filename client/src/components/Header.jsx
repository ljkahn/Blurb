import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../style/Header.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchBar from "./SearchBar/SearchBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Auth from "../utils/auth";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

function Header({ registered, isRegistered}) {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const navigation = useNavigate();


  const handleLogout = () => {
    isRegistered(false);
    Auth.logout(navigation);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <>
      <div id="header">
        <div id="searchCon">
          <Tooltip title="Search other Blurb users by their username here! 🔍">
            <div id="button">
              <IconButton onClick={toggleSearchBar}>
                <SearchIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </div>
          </Tooltip>
          {isSearchBarVisible && <SearchBar />}
        </div>
        {registered && <Button id="logout" onClick={handleLogout} variant="contained">
          Logout
        </Button>}
      </div>
    </>
  );
}

export default Header;
