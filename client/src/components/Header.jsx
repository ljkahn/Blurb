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
import { Link, useNavigate, useLocation } from "react-router-dom";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import Badge from "@mui/material/Badge";

function Header({ registered, isRegistered }) {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchIconClicked, setSearchIconClicked] = useState(false);
  const location = useLocation();
  const navigation = useNavigate();

  const handleLogout = () => {
    Auth.logout(navigation);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
    setSearchIconClicked(!searchIconClicked);
  };

  const yellow = "#F7E258";
  const lightGray = "#BEBFC5";

  return (
    <>
      <div id="header">
        <div id="searchCon">
          <Tooltip title="Search other Blurb users by their username here! 🔍">
            <div id="button">
              <IconButton onClick={toggleSearchBar}>
                <SearchIcon
                  sx={{ fontSize: 40 }}
                  style={{
                    fill: searchIconClicked ? yellow : lightGray,
                  }}
                />
              </IconButton>
            </div>
          </Tooltip>
          {isSearchBarVisible && <SearchBar />}
        </div>
        <div id="messageLog">
        <Tooltip title="Check out our direct messaging platform to have one-on-one conversations! 🛝">
          <Link to="/messages/:username">
            <IconButton>
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                color="secondary"
              >
                <QuestionAnswerRoundedIcon
                  sx={{ fontSize: 40 }}
                  style={{
                    fill:
                      location.pathname === "/messages/:username"
                        ? yellow
                        : lightGray,
                  }}
                />
              </Badge>
            </IconButton>
          </Link>
          </Tooltip>
          {registered && (
            <Button id="logout" onClick={handleLogout} variant="contained">
              Logout
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
