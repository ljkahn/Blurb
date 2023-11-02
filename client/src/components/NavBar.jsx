import React, { useState } from "react";
import "../style/nav.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div id="navContain">
      <Link to="/home">
        <IconButton>
          <HomeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Link>
      <Link to="/flame">
        <IconButton>
          <LocalFireDepartmentIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Link>

      <button onClick={openModal} id="addBlurb">
        B
      </button>
      <Link to='/notifications'>

      <button id="addBlurb">B</button>
      <Link to='/Likes'>
        <IconButton aria-label={notificationsLabel(100)}>
          <Badge badgeContent={100} color="secondary">
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </Badge>
        </IconButton>
      </Link>

      <Link to="/profile">

      <div>

        <IconButton>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </Link>
      <Modal
      open={isModalOpen}
      onClose={closeModal}
      >
        <form>
          <TextField id="outlined-basic" label="Blurb" variant="outlined" />
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value='topic'
            label="Topic"
            onChange={handleChange}
          >
            <MenuItem value={10}>Why Jordan Is Cool</MenuItem>
            <MenuItem value={20}>Why Mitch Is Cool</MenuItem>
            <MenuItem value={30}>Why Lia Is Cool</MenuItem>
            <MenuItem value={30}>Why Pete is a Pedo</MenuItem>
          </Select> */}
        </form>
      </Modal>
    </div>
  );
}

export default NavBar;
