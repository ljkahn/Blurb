import React, { useState, useEffect } from "react";
import Photo from "../Profile/ProfilePhoto";
import Button from "@mui/material/Button";
import "../../style/Profile.css";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import CloudinaryUploadWidget from "../Upload";

// import AccountEdit from "../Profile/AccountEdit"
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../../utils/mutations/userMutations";

const neon = "#EDFB60";
const white = "#f5f5f5";
const lightGray = "#BEBFC5";
const gray = "#808080";
const darkGray = "#555555";
const jetBlack = "#343434";
const black = "#212121";

function Edit({ userData, showAccountSettings }) {
  const [formData, setFormData] = useState({
    username: "",
    profile: {
      fullName: "",
      location: "",
      bio: "",
      profilePic: ""
    },
  });


  const [editUser, { loading, error }] = useMutation(EDIT_USER);


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
    editUser({
      variables: {
        username: formData.username,
        profile: {
          fullName: formData.profile.fullName,
          location: formData.profile.location,
          bio: formData.profile.bio,
          profilePic: formData.profile.profilePic,
        },
      },
    })
    .then((result) => {
      console.log('User updated:', result.data.editUser);
      //Handle success somehow, alert or redirect back to profile page?
    })
    .catch((e) => {
      console.error("Error updating user:", e)
    });
  };

  const handleAccountSettingsClick = () => {
    //handle changing email and password or deleting account
    showAccountSettings();
  };

  const handleProfileImageUpload = (imageUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        profilePic: imageUrl
      }
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setFormData((prevData) => ({
        ...prevData,
        username: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          [name]: value,
        },
      }));
    }
  }
  return (
    <div id="editProfile">
      
      {/* {userData && userData.profile && ()} */}
      <Photo profileImg={formData.profile.profilePic} />
      {/* <IconButton>
        <EditIcon onClick={openCloudinaryWidget} />
      </IconButton> */}
      <div>
        <CloudinaryUploadWidget setProfileImg={handleProfileImageUpload}/>
      </div>
      <h2>Edit Profile</h2>
      <div>
        <TextField 
        name="fullName"
        value={formData.profile.fullName}
        id="standard-basic" 
        label="Full Name" 
        variant="standard" 
        onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField 
        name='username'
        value={formData.username}
        id="standard-basic" 
        label="Username" 
        variant="standard" 
        onChange={handleInputChange}

        />
      </div>
      <div>
        <TextField
        name='location'
        value={formData.profile.location}
        id="standard-basic" 
        label="Location" 
        variant="standard" 
        onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField 
        name='bio'
        value={formData.profile.bio}
        id="standard-basic" 
        label="Bio" 
        variant="standard" 
        onChange={handleInputChange}
        
        />
      </div>
      <div>
        <Button
          style={buttonStyle}
          onClick={handleSaveChanges}
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
      
      
    </div>
  );
}

export default Edit;
