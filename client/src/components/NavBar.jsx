import React from "react";
import "../style/nav.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}

function NavBar() {
  return (
    <div id="navContain">
      <Link to='/home'>
        <IconButton>
          <HomeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Link>
      <Link to='/flame'>
        <IconButton>
          <LocalFireDepartmentIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Link>
      <button id="addBlurb">B</button>
      <div>
        <IconButton aria-label={notificationsLabel(100)}>
          <Badge badgeContent={100} color="secondary">
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </Badge>
        </IconButton>
      </div>
      <div>
        <IconButton>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default NavBar;
