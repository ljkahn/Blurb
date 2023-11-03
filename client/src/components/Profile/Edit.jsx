import React from "react";
import Photo from "../Profile/ProfilePhoto";
import Button from "@mui/material/Button";
import "../../style/Profile.css";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";

// import AccountEdit from "../Profile/AccountEdit"

const neon = "#EDFB60";
const white = "#f5f5f5";
const lightGray = "#BEBFC5";
const gray = "#808080";
const darkGray = "#555555";
const jetBlack = "#343434";
const black = "#212121";

function Edit({ showAccountSettings }) {
  const buttonStyle = {
    backgroundColor: neon,
    color: black,
    margin: 10,
  };
  const accountStyle = {
    backgroundColor: white,
    color: black,
    margin: 10,
  };

  const handleSaveChanges = () => {
    //send new profile info to back end to be displayed on profile page and take user back to the profile page to see their new changes
  };

  const handleAccountSettingsClick = () => {
    //handle changing email and password or deleting account
    showAccountSettings();
  };

  return (
    <div id="editProfile">
      {/* <Container> */}
      <Photo />
      <IconButton>
        <EditIcon />
      </IconButton>
      <h2>Edit Profile</h2>
      <div>
        <TextField id="standard-basic" label="First Name" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Last Name" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Username" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Location" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Bio" variant="standard" />
      </div>
      <div>
        <Button
          style={buttonStyle}
          // onClick={handleSaveChanges}
          variant="contained"
        >
          <SaveIcon />
          Save Changes
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          style={accountStyle}
          onClick={handleAccountSettingsClick}
        >
          <SettingsIcon />
          Account Settings
        </Button>
      </div>
      {/* </Container> */}
    </div>
  );
}

export default Edit;
