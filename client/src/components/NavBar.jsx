import React, { useState, useEffect } from "react";
import "../style/Nav.css";
import "../style/BlurbModel.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, Input, Button } from "@mui/material"; // Import Select and MenuItem
import { useQuery } from "@apollo/client";
import { QUERY_MY_PROFILE } from "../utils/Queries/userQueries.js";
import Photo from "../components/Profile/tinyPhoto.jsx";
import AddBlurb from "./Blurbs/AddBlurb";
import logo from "../public/assets/blurbLogo.png";
import Box from "@mui/material/Box";
import NotificationButton from "./Notify/NotificationButton.jsx";

function NavBar() {
  const [userData, setUserData] = useState({
    username: "Guest", // Default username or any other default values
    profilePic: "", // Default profile picture URL
    // Other default properties
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { loading, data } = useQuery(QUERY_MY_PROFILE);

  useEffect(() => {
    if (!loading && data && data.me) {
      setUserData({
        username: data.me.username,
        profilePic: data.me.profile
          ? data.me.profile.profilePic
          : "default-profile-pic-url",
        // Set other properties based on data.me
      });
    }
  }, [loading, data]);

  const yellow = "#F7E258";
  const lightGray = "#BEBFC5";

  const editStyle = {
    isActive: yellow,
    notActive: lightGray,
  };
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div id="navContain">
      <Tooltip
        title="Home page, this is where you can check out other user's blurbs! 👥"
        enterTouchDelay={0}
        leaveTouchDelay={2000}
      >
        <Link to="/home">
          <IconButton>
            <HomeIcon
              style={{ fill: isActive("/home") ? yellow : lightGray }}
              sx={{ fontSize: 40 }}
            />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip
        title="Flame page, this is where Blurbs with more than 10 likes get promoted to! 🎉"
        enterTouchDelay={0}
        leaveTouchDelay={2000}
      >
        <Link to="/flame">
          <IconButton>
            <LocalFireDepartmentIcon
              style={{ fill: isActive("/flame") ? yellow : lightGray }}
              sx={{ fontSize: 40 }}
            />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Click this button to post a blurb! 💬">
        <button onClick={openModal} id="addBlurb">
          <Box
            component="img"
            id="logo"
            sx={{ height: 35 }}
            alt="Logo"
            src={logo}
          />
        </button>
      </Tooltip>
      <Tooltip
        title="Notifications page, this is where you will find any news regarding your blurbs or account! ❤️"
        enterTouchDelay={0}
        leaveTouchDelay={2000}
      >
        <Link to="/Likes">
          <NotificationButton />
        </Link>
      </Tooltip>
      <Tooltip
        title="Profile page, this is where you can edit your profile information, and blurbs! ✏️"
        enterTouchDelay={0}
        leaveTouchDelay={2000}
      >
        <Link to="/profile">
          <IconButton>
            <Photo profileImg={userData.profilePic} />
          </IconButton>
        </Link>
      </Tooltip>

      <Modal
        style={{ zIndex: 0 }}
        id="blurbModal"
        open={isModalOpen}
        onClose={closeModal}
      >
        <div>
          <AddBlurb setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </div>
  );
}

export default NavBar;
