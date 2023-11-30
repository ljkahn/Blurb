import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../../utils/mutations/userMutations";
import "../../style/Profile.css";
import Photo from "../Profile/ProfilePhoto";
import CloudinaryUploadWidget from "../Upload";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//Styling for buttons
const neon = "#F7E258";
const white = "#f5f5f5";
const black = "#212121";

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
//passing showAccountSettings as a prop so that component can be made visible upon click of "account Settings"
function Edit({ userData, showAccountSettings }) {
  const [editUser, refetch, loading] = useMutation(EDIT_USER);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [formData, setFormData] = useState({
    username: "",
    profile: {
      fullName: "",
      location: "",
      bio: "",
      profilePic: "",
    },
  });

  //Setting input fields to user's existing information
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username,
        profile: {
          fullName: userData.profile.fullName,
          location: userData.profile.location,
          bio: userData.profile.bio,
          profilePic: userData.profile.profilePic,
        },
      });
    }
  }, [userData]);

  //updating variables to currently updated information rather than user's previous information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
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
  };

  //Set new profile information variables to currently imputed values using edit_user mutation
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
        // console.log('User updated:', result.data.editUser);
        showSnackbar("Profile updated successfully", "success");
      })
      .catch((e) => {
        console.error("Error updating user:", e);
        showSnackbar(
          "Failed to update profile, check that you are logged in!",
          "error"
        );
      });
  };
  //Show success or failure snackbar upon save.
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  //Show AccountSettings component, keep profile hidden, and hide edit profile component to access further user editing functionality
  const handleAccountSettingsClick = () => {
    showAccountSettings();
  };

  //Use Cloudinary upload widget to upload a new profile picture that replaces existing photo
  const handleProfileImageUpload = (imageUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        profilePic: imageUrl,
      },
    }));
  };

  return (
    <div id="editProfile">
      <Photo profileImg={formData.profile.profilePic} />
      <div>
        <CloudinaryUploadWidget setProfileImg={handleProfileImageUpload} />
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
          name="username"
          value={formData.username}
          id="standard-basic"
          label="Username"
          variant="standard"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField
          name="location"
          value={formData.profile.location}
          id="standard-basic"
          label="Location"
          variant="standard"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <TextField
          name="bio"
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
          id="btn"
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
          id="btn"
        >
          <SettingsIcon />
          Account Settings
        </Button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Duration in milliseconds
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Edit;
