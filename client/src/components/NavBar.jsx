import React, { useState, useEffect } from "react";
import "../style/Nav.css";
import "../style/BlurbModel.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, Input, Button } from "@mui/material"; // Import Select and MenuItem
import { useQuery } from "@apollo/client";
import { QUERY_MY_PROFILE } from "../utils/queries/userQueries.js";
import Photo from "../components/Profile/tinyPhoto.jsx";
import AddBlurb from "./Blurbs/AddBlurb";
import theme from "../style/Theme";

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

  console.log(userData);

  return (
    <div id="navContain">
      <Link to="/home">
        <IconButton>
          <HomeIcon color="action" sx={{ fontSize: 40 }} />
        </IconButton>
      </Link>
      <Link to="/flame">
        <IconButton>
          <LocalFireDepartmentIcon sx={{ fontSize: 40, }} />
        </IconButton>
      </Link>
      <button onClick={openModal} id="addBlurb">
        B
      </button>
      <Link to="/Likes">
        <IconButton aria-label={notificationsLabel(100)}>
          <Badge badgeContent={100} color="secondary">
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </Badge>
        </IconButton>
      </Link>
      <Link to="/profile">
        <IconButton>
          <Photo profileImg={userData.profilePic} />
        </IconButton>
      </Link> 
   
      <Modal
        style={{ zIndex: 0 }}
        id="blurbModal"
        open={isModalOpen}
        onClose={closeModal}
      >
        <div>
          <AddBlurb />
        </div>

        {/* <form id="blForm">
          <TextField id="outlined-basic" label="Blurb" variant="outlined" />
          <Dropdown>
            <MenuButton id="addTag">Add Tag</MenuButton>
            <Menu slots={{ listbox: Listbox }}>
              <MenuItem onClick={createHandleMenuClick("Profile")}>
                Funny
              </MenuItem>
              <MenuItem onClick={createHandleMenuClick("Language settings")}>
                Tanks
              </MenuItem>
              <MenuItem onClick={createHandleMenuClick("Log out")}>
                Rats
              </MenuItem>
              <MenuItem onClick={createHandleMenuClick("Log out")}>
                Dogs
              </MenuItem>
              <MenuItem onClick={createHandleMenuClick("Log out")}>
                Cats
              </MenuItem>
            </Menu>
          </Dropdown>
          <Button
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
          >
            Post
          </Button>
        </form> */}
      </Modal>
  
    </div>
  );
}

export default NavBar;
