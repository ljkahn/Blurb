import React, { useState } from "react";
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
import { styled } from "@mui/system";
import { ADD_Blurb } from "../utils/mutations/Blurb/BlurbMutations";
import { useMutation } from "@apollo/client";

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
  const [selectedTags, setSelectedTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionChange = (event) => {
    setSelectedTags(event.target.value); // Update selected tags
  };
  const [addBlurb] = useMutation(ADD_Blurb); // State for selected options
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [blurbText, setBlurbText] = useState(""); // State for blurb text

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  const handleBlurbSubmit = (event) => {
    event.preventDefault();

    // Combine blurbText and selectedTags before submitting to the database
    const blurbData = {
      blurbText: blurbText,
      tags: selectedTags,
    };

    addBlurb({
      variables: blurbData,
    })
      .then((response) => {
        // Handle the response from the server, e.g., show a success message or navigate to a new page.
        console.log("Mutation Response:", response);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message.
        console.error("Mutation Error:", error);
      });

    // No need to console.log("Blurb Data:", blurbData) anymore
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
      <Link to="/Likes">
        <IconButton aria-label={notificationsLabel(100)}>
          <Badge badgeContent={100} color="secondary">
            <FavoriteIcon sx={{ fontSize: 40 }} />
          </Badge>
        </IconButton>
      </Link>
      <Link to="/profile">
        <IconButton>
          {/* <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          /> */}
        </IconButton>
      </Link>
      <Modal
        style={{ zIndex: 0 }}
        id="blurbModal"
        open={isModalOpen}
        onClose={closeModal}
      >
        <form id="blForm" onSubmit={handleBlurbSubmit}>
          <TextField
            id="outlined-basic"
            label="Blurb"
            variant="outlined"
            name=""
            value={blurbText}
            onChange={(e) => setBlurbText(e.target.value)}
          />
          <Select
            multiple
            value={selectedTags}
            onChange={handleOptionChange}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="Funny">Funny</MenuItem>
            <MenuItem value="Tanks">Tanks</MenuItem>
            <MenuItem value="Rats">Rats</MenuItem>
            <MenuItem value="Dogs">Dogs</MenuItem>
            <MenuItem value="Cats">Cats</MenuItem>
          </Select>
          <Button
            style={{ margin: ".5rem" }}
            variant="contained"
            disableElevation
          >
            Post
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default NavBar;
